import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type WritingPostFrontmatter = {
  title: string
  date: string
  summary: string
  tags: string[]
}

export type WritingPost = {
  slug: string
  frontmatter: WritingPostFrontmatter
  content: string
  readingTime: string
}

const writingDir = path.join(process.cwd(), 'content', 'writing')

// ~200 words per minute, rounded up to a clean minute
function estimateReadingTime(text: string): string {
  const words = text.split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

function readPost(fileName: string): WritingPost {
  const slug = fileName.replace(/\.mdx$/, '')
  const raw = fs.readFileSync(path.join(writingDir, fileName), 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    frontmatter: data as WritingPostFrontmatter,
    content: content.trim(),
    readingTime: estimateReadingTime(content)
  }
}

export function getAllWritingPosts(): WritingPost[] {
  if (!fs.existsSync(writingDir)) return []
  return fs
    .readdirSync(writingDir)
    .filter((file) => file.endsWith('.mdx'))
    .map(readPost)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
}

export function getWritingPostBySlug(slug: string): WritingPost | null {
  // guards against path traversal and missing files
  if (!/^[a-z0-9-]+$/.test(slug)) return null
  const file = `${slug}.mdx`
  if (!fs.existsSync(path.join(writingDir, file))) return null
  return readPost(file)
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })
}
