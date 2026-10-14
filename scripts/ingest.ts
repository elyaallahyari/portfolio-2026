import fs from 'fs'
import path from 'path'
import { embedMany } from 'ai'
import { prisma, embeddingModel } from '../src/lib/rag/retrieval'
import { getAllCaseStudies } from '../src/lib/case-studies'
import { getAllWritingPosts } from '../src/lib/writing'

type RawChunk = { sourceTitle: string; sourceHref: string; content: string }

function chunkText(text: string, maxLen = 900): string[] {
  const paragraphs = text
    .replace(/\r/g, '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)

  const chunks: string[] = []
  let current = ''
  for (const p of paragraphs) {
    if ((current + '\n\n' + p).length > maxLen && current) {
      chunks.push(current.trim())
      current = p
    } else {
      current = current ? current + '\n\n' + p : p
    }
  }
  if (current.trim()) chunks.push(current.trim())
  return chunks
}

async function main() {
  const raw: RawChunk[] = []

  for (const study of getAllCaseStudies()) {
    for (const chunk of chunkText(study.content)) {
      raw.push({
        sourceTitle: `Case study: ${study.frontmatter.title}`,
        sourceHref: `/work/${study.slug}`,
        content: chunk
      })
    }
  }

  for (const post of getAllWritingPosts()) {
    for (const chunk of chunkText(post.content)) {
      raw.push({
        sourceTitle: `Writing: ${post.frontmatter.title}`,
        sourceHref: `/writing/${post.slug}`,
        content: chunk
      })
    }
  }

  const resumePath = path.join(process.cwd(), 'content', 'resume.txt')
  if (fs.existsSync(resumePath)) {
    const resume = fs.readFileSync(resumePath, 'utf8')
    for (const chunk of chunkText(resume)) {
      raw.push({ sourceTitle: 'Résumé (PDF)', sourceHref: '/resume.pdf', content: chunk })
    }
  } else {
    console.warn('[ingest] no content/resume.txt found — skipping résumé')
  }

  console.log(`[ingest] embedding ${raw.length} chunks…`)
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: raw.map((r) => r.content)
  })

  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "RagChunk" RESTART IDENTITY`)

  for (let i = 0; i < raw.length; i++) {
    const literal = `[${embeddings[i].join(',')}]`
    await prisma.$executeRaw`
      INSERT INTO "RagChunk" ("sourceTitle", "sourceHref", "content", "embedding")
      VALUES (${raw[i].sourceTitle}, ${raw[i].sourceHref}, ${raw[i].content}, ${literal}::vector)
    `
  }

  console.log(`[ingest] ✅ ${raw.length} chunks embedded and stored.`)
}

main()
  .catch((e) => {
    console.error('[ingest] failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
