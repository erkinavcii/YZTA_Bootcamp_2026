import { useState } from 'react'
import Rail from './components/Rail'
import ChatPanel from './components/chat/ChatPanel'
import TripPanel from './components/itinerary/TripPanel'
import { sendChat } from './api/client'
import type { UiMessage, TripPlan, ChatMessage } from './types/plan'

export default function App() {
  const [messages, setMessages] = useState<UiMessage[]>([
    {
      role: 'assistant',
      content: 'Hi! I can help you plan your health tourism journey. Type your treatment request (e.g. dental implants in Bodrum) to get started.',
      time: '12:00 PM'
    }
  ])
  const [plan, setPlan] = useState<TripPlan | null>(null)
  const [topic, setTopic] = useState<string | undefined>(undefined)
  const [busy, setBusy] = useState(false)

  const handleSend = async (text: string) => {
    if (!text.trim()) return

    // 1. Add user message
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg: UiMessage = { role: 'user', content: text, time: timeStr }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setBusy(true)

    try {
      // Convert UiMessage to ChatMessage for the API
      const history: ChatMessage[] = updatedMessages.map(m => ({
        role: m.role,
        content: m.content
      }))

      // 2. Call backend
      const res = await sendChat(text, history)

      // 3. Add AI reply
      const aiMsg: UiMessage = {
        role: 'assistant',
        content: res.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiMsg])

      // 4. Update plan if available
      if (res.plan) {
        setPlan(res.plan)
        setTopic(`${res.plan.overview.procedure} in ${res.plan.summary.region}`)
      }
    } catch (err) {
      console.error(err)
      const errorMsg: UiMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div className="brandbar">
        <div className="logo-mark">H</div>
        <div className="logo-text">
          <b>HealRoute</b> <span className="grad">AI</span>
          <small>Your Health Journey Partner</small>
        </div>
      </div>

      <div className="app">
        <Rail />
        <ChatPanel messages={messages} topic={topic} busy={busy} onSend={handleSend} />
        <TripPanel plan={plan} />
      </div>

      <p className="proto-note">
        HealRoute AI — Sprint 2 arayüzü (React + FastAPI)
      </p>
    </>
  )
}
