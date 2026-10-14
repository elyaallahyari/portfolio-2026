export const runtime = 'nodejs'
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateId,
  streamText,
  type UIMessage
} from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { CHAT_MODEL, SYSTEM_PROMPT, embedQuery, prisma, retrieve } from '@/lib/rag/retrieval'

const provider = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL
})

export const maxDuration = 60

const FALLBACK_TEXT =
  "I don't know that one — it's not in my grounded content (my corpus is Elya's projects, case studies and résumé). Ask Elya directly: elyaallahyari@gmail.com"

function lastUserText(messages: UIMessage[]): string {
  const last = [...messages].reverse().find((m) => m.role === 'user')
  return (
    last?.parts
      .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join(' ') ?? ''
  )
}

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json()
    const question = lastUserText(messages)
    if (!question.trim()) {
      return Response.json({ error: 'Empty question.' }, { status: 400 })
    }

    const queryEmbedding = await embedQuery(question)

    const { content, sources } = await retrieve(queryEmbedding)

    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        if (!content) {
          writer.write({
            type: 'data-grounded',
            id: generateId(),
            data: { sources: [], refused: true }
          })
          const messageId = generateId()
          const textId = generateId()
          writer.write({ type: 'start', messageId })
          writer.write({ type: 'text-start', id: textId })
          writer.write({ type: 'text-delta', id: textId, delta: FALLBACK_TEXT })
          writer.write({ type: 'text-end', id: textId })
          writer.write({ type: 'finish' })
          return
        }

        writer.write({
          type: 'data-grounded',
          id: generateId(),
          data: { sources, refused: false }
        })

        const result = streamText({
          model: provider.chat(CHAT_MODEL),
          system: SYSTEM_PROMPT.replace('{{CONTEXT}}', content),
          messages: await convertToModelMessages(messages)
        })

        writer.merge(result.toUIMessageStream())
      },
      onError: (error) => {
        console.error('[chat]', error)
        return "The assistant hit an unexpected error. Your question wasn't lost — press Retry."
      }
    })

    return createUIMessageStreamResponse({ stream })
  } catch (error) {
    console.error('[chat] setup failed:', error)
    return Response.json(
      { error: "The assistant couldn't start. Try again in a moment." },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
