'use client'

import { useEffect, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import type { UIMessage } from 'ai'
import type { GroundedSource } from '@/lib/rag/retrieval'

type GroundedData = { sources: GroundedSource[]; refused: boolean }

export type ChatUIMessage = UIMessage<unknown, { grounded: GroundedData }>

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status, error, stop, regenerate } = useChat<ChatUIMessage>({
    transport: new DefaultChatTransport({ api: '/api/chat' })
  })

  const busy = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    inputRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const lastGrounded = (): GroundedData | null => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const part = messages[i].parts.find((p) => p.type === 'data-grounded')
      if (part) return part.data
    }
    return null
  }
  const grounded = lastGrounded()

  return (
    <>
      <button
        ref={toggleRef}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="portfolio-chat"
        aria-label={open ? 'Close Ask my portfolio' : 'Ask my portfolio'}
        className="fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2 rounded-full bg-signal px-5 font-display font-semibold text-ink shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
      >
        {open ? '× Close' : '✦ Ask my portfolio'}
      </button>

      {open && (
        <div
          id="portfolio-chat"
          ref={panelRef}
          role="dialog"
          aria-label="Ask my portfolio"
          className="fixed bottom-24 right-5 z-50 flex h-112 w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-line bg-ink/90 backdrop-blur-md"
        >
          <div className="border-b border-line px-4 py-3">
            <p className="font-display text-sm font-semibold text-cream">
              Ask my portfolio<span className="text-signal">.</span>
            </p>
            <p className="mt-1 text-[0.7rem] leading-snug text-muted">
              AI-generated, grounded only in Elya&apos;s own content. It can be wrong — verify
              anything important.
            </p>
          </div>

          <div
            className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
            role="log"
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.length === 0 && (
              <p className="text-sm text-muted">
                Try:{' '}
                <button
                  className="text-trust underline underline-offset-4"
                  onClick={() =>
                    sendMessage({
                      text: 'What AI-UX patterns does Elya care about?'
                    })
                  }
                >
                  &ldquo;What AI-UX patterns does Elya care about?&rdquo;
                </button>
              </p>
            )}

            {messages.map((m) => (
              <div key={m.id}>
                {m.role === 'user' && (
                  <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-glass px-3 py-2 text-sm text-cream">
                    {m.parts
                      .filter((p) => p.type === 'text')
                      .map((p) => p.text)
                      .join(' ')}
                  </p>
                )}
                {m.role === 'assistant' && (
                  <div className="max-w-[92%] space-y-2">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-cream/90">
                      {m.parts
                        .filter((p) => p.type === 'text')
                        .map((p) => p.text)
                        .join('')}
                      {status === 'streaming' && m === messages[messages.length - 1] && (
                        <span className="caret" aria-hidden="true" />
                      )}
                    </p>

                    {m === messages[messages.length - 1] && grounded && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs uppercase tracking-wide text-muted">
                          {grounded.refused ? 'not grounded' : 'grounded in:'}
                        </span>
                        {grounded.sources.map((s) => (
                          <a
                            key={s.href + s.title}
                            href={s.href}
                            className="rounded-full border border-trust/40 px-2.5 py-1 text-xs text-trust transition-colors hover:bg-trust/10"
                          >
                            {s.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {status === 'submitted' && (
              <p className="text-sm text-muted">
                searching my content<span className="animate-pulse">…</span>
              </p>
            )}

            {error && (
              <div className="rounded-2xl border border-signal/40 bg-glass p-3">
                <p className="text-sm text-cream">
                  The response was cut off — your question is safe.
                </p>
                <button
                  onClick={() => regenerate()}
                  className="mt-2 rounded-full border border-signal/50 px-3 py-1 text-xs font-semibold text-signal transition-colors hover:bg-signal hover:text-ink"
                >
                  Retry
                </button>
              </div>
            )}
          </div>

          <form
            className="flex gap-2 border-t border-line p-3"
            onSubmit={(e) => {
              e.preventDefault()
              const input = e.currentTarget.elements.namedItem('q') as HTMLInputElement
              if (!input.value.trim() || busy) return
              sendMessage({ text: input.value })
              input.value = ''
            }}
          >
            <input
              ref={inputRef}
              name="q"
              autoComplete="off"
              aria-label="Your question"
              placeholder={busy ? 'answering…' : "Ask about Elya's work…"}
              className="min-w-0 flex-1 rounded-full border border-line bg-glass px-4 py-2 text-sm text-cream placeholder:text-muted focus:border-trust focus:outline-none"
            />
            {busy ? (
              <button
                type="button"
                onClick={() => stop()}
                className="rounded-full border border-line px-3 py-2 text-xs font-semibold text-muted transition-colors hover:text-cream"
              >
                Stop
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-full bg-cream px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-signal"
              >
                Send
              </button>
            )}
          </form>
        </div>
      )}
    </>
  )
}
