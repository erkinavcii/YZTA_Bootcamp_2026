import type { ChatMessage, ChatResponse } from '../types/plan'

// Vite proxy /api → backend (127.0.0.1:8000)
export async function sendChat(
  message: string,
  history: ChatMessage[],
): Promise<ChatResponse> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}
