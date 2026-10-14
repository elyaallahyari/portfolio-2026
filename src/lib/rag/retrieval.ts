import { createOpenAI } from '@ai-sdk/openai'
import { PrismaClient } from '@/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { embed } from 'ai'

const provider = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL
})

export const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL ?? 'text-embedding-3-small'
export const CHAT_MODEL = process.env.CHAT_MODEL ?? 'openai/gpt-4o-mini'
export const MIN_SIMILARITY = Number(process.env.RAG_MIN_SIMILARITY ?? 0.3)

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
export const prisma = new PrismaClient({ adapter })

export const embeddingModel = provider.textEmbeddingModel(EMBEDDING_MODEL)

export type GroundedSource = { title: string; href: string; similarity: number }
export type RetrievedChunk = { content: string; sources: GroundedSource[] }

export async function embedQuery(text: string): Promise<number[]> {
  const { embedding } = await embed({ model: embeddingModel, value: text })
  return embedding
}

export async function retrieve(queryEmbedding: number[], k = 5): Promise<RetrievedChunk> {
  const literal = `[${queryEmbedding.join(',')}]`

  const rows = await prisma.$queryRaw<
    { sourceTitle: string; sourceHref: string; content: string; distance: number }[]
  >`
    SELECT "sourceTitle", "sourceHref", "content",
           "embedding" <=> ${literal}::vector AS distance
    FROM "RagChunk"
    ORDER BY "embedding" <=> ${literal}::vector
    LIMIT ${k}
  `

  const sources: GroundedSource[] = rows.map((r) => ({
    title: r.sourceTitle,
    href: r.sourceHref,
    similarity: 1 - Number(r.distance)
  }))

  const best = sources[0]?.similarity ?? 0
  const confident = best >= MIN_SIMILARITY

  return {
    content: confident ? rows.map((r) => r.content).join('\n\n---\n\n') : '',
    sources: confident ? sources : []
  }
}

export const SYSTEM_PROMPT = `You are the portfolio assistant for Elya Allahyari, a frontend engineer specializing in human-centered AI.

STRICT RULES:
1. Answer ONLY from the CONTEXT provided with this conversation. You have no other knowledge.
2. If the CONTEXT does not contain the answer, say exactly: "I don't know that one — it's not in my grounded content. Ask Elya directly: elyaallahyari@gmail.com". Never guess, never fill gaps.
3. When you use information from the context, mention which source it came from by name (the source titles are given).
4. Be concise, warm and specific. Match the voice of the content: honest about failures and trade-offs, allergic to buzzwords.
5. For anything private (salary expectations, personal data not in the context), refer the user to Elya directly.

CONTEXT:
{{CONTEXT}}`
