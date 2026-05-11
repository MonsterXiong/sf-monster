const API_BASE = import.meta.env.VITE_API_BASE || '/api'

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function streamChat(body: unknown, onDelta: (text: string) => void, onDone?: () => void) {
  const res = await fetch(`${API_BASE}/chat/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!res.ok || !res.body) throw new Error(await res.text())

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const events = buffer.split('\n\n')
    buffer = events.pop() || ''
    for (const event of events) {
      const line = event.split('\n').find(item => item.startsWith('data:'))
      if (!line) continue
      const payload = line.replace(/^data:\s*/, '')
      if (payload === '[DONE]') {
        onDone?.()
        return
      }
      const data = JSON.parse(payload)
      if (data.delta) onDelta(data.delta)
    }
  }
  onDone?.()
}
