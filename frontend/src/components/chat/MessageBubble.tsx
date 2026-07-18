import type { UiMessage } from '../../types/plan'

export default function MessageBubble({ msg }: { msg: UiMessage }) {
  if (msg.role === 'user') {
    return (
      <div className="msg user">
        <div className="bubble">{msg.content}</div>
        {msg.time && <time>{msg.time}</time>}
      </div>
    )
  }
  return (
    <div className="msg ai">
      <div className="avatar">H</div>
      <div className="bubble">
        <b>HealRoute AI</b>
        <p>{msg.content}</p>
      </div>
    </div>
  )
}
