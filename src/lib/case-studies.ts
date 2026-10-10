import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type CaseStudyFrontmatter = {
  title: string
  year: string
  status: string
  stack: string
  summary: string
  order: number
}

export type CaseStudy = {
  slug: string
  frontmatter: CaseStudyFrontmatter
  content: string
}

const caseStudiesDir = path.join(process.cwd(), 'content', 'case-studies')

function readCaseStudy(fileName: string): CaseStudy {
  const slug = fileName.replace(/\.mdx$/, '')
  const raw = fs.readFileSync(path.join(caseStudiesDir, fileName), 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    frontmatter: data as CaseStudyFrontmatter,
    content: content.trim()
  }
}

export function getAllCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(caseStudiesDir)) return []
  return fs
    .readdirSync(caseStudiesDir)
    .filter((file) => file.endsWith('.mdx'))
    .map(readCaseStudy)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order)
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  // guards against path traversal and missing files
  if (!/^[a-z0-9-]+$/.test(slug)) return null
  const file = `${slug}.mdx`
  if (!fs.existsSync(path.join(caseStudiesDir, file))) return null
  return readCaseStudy(file)
}
