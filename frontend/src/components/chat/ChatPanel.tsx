import { useEffect, useRef } from 'react'
import type { UiMessage } from '../../types/plan'
import MessageBubble from './MessageBubble'
import TopicChip from './TopicChip'
import Composer from './Composer'

interface Props {
  messages: UiMessage[]
  topic?: string
  busy?: boolean
  onSend: (text: string) => void
}

export default function ChatPanel({ messages, topic, busy, onSend }: Props) {
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  return (
    <section className="chat">
      <div className="chat-scenery" />

      <header className="chat-head">
        <div>
          <b>HealRoute AI</b>
          <small>Your Health Journey Partner</small>
        </div>
        <button className="dots" aria-label="Menü">···</button>
      </header>

      <div className="chat-body" ref={bodyRef}>
        {topic && <TopicChip label={topic} />}
        {messages.map((m, i) => (
          <MessageBubble key={i} msg={m} />
        ))}
        {busy && (
          <div className="msg ai">
            <div className="avatar">H</div>
            <div className="bubble">
              <p>Planınız hazırlanıyor…</p>
            </div>
          </div>
        )}
      </div>

      <Composer onSend={onSend} disabled={busy} />
    </section>
  )
}
