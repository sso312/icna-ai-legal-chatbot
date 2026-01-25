import { ref } from 'vue'

export type Message = {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: string // ISO 문자열로 저장
}

const messages = ref<Message[]>([])
let nextId = 1

export function useChat() {
  function addMessage(text: string, sender: 'user' | 'bot', timestamp = new Date().toISOString()) {
    console.log('[addMessage] 메시지 추가:', { text, sender, timestamp })
    messages.value.push({ id: nextId++, text, sender, timestamp })
  }

  return { messages, addMessage }
}
