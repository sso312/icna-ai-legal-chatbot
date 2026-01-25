<template>
  <div class="flex flex-col h-screen bg-gray-50 items-center">
    <div class="flex flex-col w-full max-w-4xl h-full bg-white shadow-md">
      
      <!-- 메시지 영역: 입력창 위까지만 -->
      <div class="overflow-auto p-4 space-y-3" style="height: calc(100vh - 178px);">
        <MessageBubble
          v-for="msg in messages"
          :key="msg.id"
          :text="msg.text"
          :isUser="msg.sender === 'user'"
          :timestamp="msg.timestamp"
        />

        <!-- 후속 질문 -->
        <div v-if="followUps.length" class="pt-4 space-y-2">
          <div class="text-sm text-gray-500">후속 질문</div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="q in followUps"
              :key="q"
              @click="askFollowUp(q)"
              class="text-sm px-4 py-2 border rounded hover:bg-gray-200"
            >
              {{ q }}
            </button>
          </div>
        </div>
      </div>

      <!-- 입력창 (하단 고정 아님) -->
      <form @submit.prevent="sendMessage" class="p-3 bg-gray-100 flex gap-2">
        <input
          v-model="input"
          type="text"
          placeholder="질문을 입력하세요..."
          class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          전송
        </button>
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useChat } from '~/composables/useChat'
import MessageBubble from './MessageBubble.vue'
import { useRoute, useRouter } from 'vue-router'
import { useRuntimeConfig, useCookie } from '#app'

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const token = useCookie('icna_token', {
  path: '/',
  sameSite: 'lax'
})
const { messages, addMessage } = useChat()
const input = ref('')
const followUps = ref<string[]>([])

const sessionId = ref(route.params.id as string) // 대화방 구별 sessionId (ref로 선언)
const chatSessions = ref<any[]>([]) // 사용자 별 기존 sessionid 목록 리스트
let firstMessageSent = ref(false) // 첫 메시지인지 추적


// 새로운 세션(대화방 생성) *페이지 로드 처음에 무조건 실행돼야함.*
async function startNewSession(title = '새로운 대화') {
  try {
    const res = await fetch(`${config.public.apiBase}/chat-sessions/session`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
    const data = await res.json()
    localStorage.setItem('sessionId', data.session._id)

    sessionId.value = data.session._id
    messages.value = []
    router.push(`/chat/${data.session._id}`)

    return data.session._id
  } catch (err) {
    console.error('세션 생성 실패:', err)
    return null
  }
}

// 사용자화 모든 Session 대화 목록 불러오기 *페이지 로드시 처음에 무조건 실행돼야함.*
async function loadSessionList() {
  try {
    const res = await fetch(`${config.public.apiBase}/chat-sessions/sessions`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    const data = await res.json()
    return data.sessions
  } catch (err) {
    console.error('세션 목록 불러오기 실패:', err)
    return []
  }
}

// 후속질문 가져오기 
async function loadFollowUpQuestions() {
  try {
    const res = await fetch(`${config.public.apiBase}/api/hyperclova/generateFollowUpQuestions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ chatId: sessionId.value })
    })
    const data = await res.json()
    followUps.value = data.followUpQuestions || []
  } catch (err) {
    console.error('후속 질문 로딩 실패:', err)
  }
}

// 사용자 질문하기
async function askFollowUp(question: string) {
  const timestamp = new Date().toISOString()
  addMessage(question, 'user', timestamp)
  saveMessage(question, 'user', timestamp)

  input.value = ''

  try {
    const res = await fetch(`${config.public.apiBase}/api/hyperclova/ask`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question,
        sessionId: sessionId.value
      })
    })

    const data = await res.json()
    const reply = data.result?.message?.content || 'AI 응답 없음'

    const replyTimestamp = new Date().toISOString()
    addMessage(reply, 'bot', replyTimestamp)
    saveMessage(reply, 'bot', replyTimestamp)

    await loadFollowUpQuestions()
  } catch (e) {
    console.error('후속 질문 오류:', e)
  }
}


// 사용자 질문/답변 저장하기
const summaryMap = ref<Record<string, number>>({}) // 세션별 요약 기록용

async function saveMessage(text: string, sender: 'user' | 'bot', timestamp: string) {
  console.log('[saveMessage] 저장 요청', {
    sessionId: sessionId.value,
    text,
    sender,
    timestamp
  })

  try {
    await fetch(`${config.public.apiBase}/chat/save`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sessionId: sessionId.value, text, sender, timestamp })
    })

    console.log('현재 세션 ID:', sessionId.value)

    // 요약 조건 체크: 유저 메시지 증가량 기반
    if (sender === 'user') {
      const userCount = messages.value.filter(m => m.sender === 'user').length
      const lastCount = summaryMap.value[sessionId.value] || 0

      const shouldSummarize =
        (lastCount === 0 && userCount === 1) ||      // 첫 질문 후 실행
        (userCount - lastCount >= 2)                 // 이후 2개 이상 증가 시 실행

      if (shouldSummarize) {
        console.log('[요약 조건 만족]', { userCount, lastCount })

        await fetch(`${config.public.apiBase}/summary/generate`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ chatId: sessionId.value })
        })

        summaryMap.value[sessionId.value] = userCount

        // 사이드바 새로고침 알림
        window.dispatchEvent(new Event('new-session'))
      }
    }

  } catch (e) {
    console.error('메시지 저장 실패:', e)
  }
}


// 메시지 보내기
async function sendMessage() {
  if (!input.value.trim()) return


  console.log('[sendMessage 🔼 토큰 확인]', token.value) // ✅ 

  const userText = input.value
  const userTimestamp = new Date().toISOString()
  addMessage(userText, 'user', userTimestamp)
  await saveMessage(userText, 'user', userTimestamp)

  input.value = ''

  try {
    const res = await fetch(`${config.public.apiBase}/api/hyperclova/ask`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: userText, sessionId: sessionId.value })
    })

    const data = await res.json()
    const reply = data.result?.message?.content || 'AI 응답 없음'

    const botTimestamp = new Date().toISOString()
    addMessage(reply, 'bot', botTimestamp)
    await saveMessage(reply, 'bot', botTimestamp)

    // 첫 질문이면 세션 리스트 갱신
    if (!firstMessageSent.value) {
      firstMessageSent.value = true

      // 새 세션 이벤트 알림 (사이드바에 전파)
      window.dispatchEvent(new Event('new-session'))

      chatSessions.value = await loadSessionList()
    }

    await loadFollowUpQuestions()
  } catch (e) {
    console.error('챗봇 응답 오류:', e)
  }
}

// 사용자 채팅 검색 기능 
async function searchMessages(keyword: string) {
  try {
    const res = await fetch(`${config.public.apiBase}/chat/search`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sessionId: sessionId.value, keyword })
    })
    const data = await res.json()
    return data.results
  } catch (err) {
    console.error('검색 실패:', err)
    return []
  }
}

// 새 세션 ID를 기준으로 해당 세션에 속하는 채팅 내역
async function loadChatHistory() {
  console.log('[loadChatHistory] 실행됨. sessionId:', sessionId.value) 

  try {
    const res = await fetch(`${config.public.apiBase}/chat/history`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ chatId: sessionId.value })
    })

    const data = await res.json()
    data.chatHistory.forEach((msg: any) => {
      console.log('[loadChatHistory] 추가할 메시지:', msg) // ✅ 로그 추가
      addMessage(msg.text, msg.sender, msg.timestamp || msg.createdAt)
    })

    await loadFollowUpQuestions()
  } catch (e) {
    console.error('대화 기록 불러오기 실패:', e)
  }
}

// 페이지 로드
onMounted(async () => {
  if (!sessionId.value) {
    // URL에 sessionId 없으면 새 세션 만들기
    const newId = await startNewSession()
    if (newId) {
      sessionId.value = newId
      router.replace(`/chat/${newId}`)
      firstMessageSent.value = false
    } else {
      firstMessageSent.value = true
    }
  }

  // 세션 ID가 있으면 대화 불러오기
  if (sessionId.value) {
    await loadChatHistory()
    chatSessions.value = await loadSessionList()
  }
})

// 대화방 ID 변경 감지 시 대화 불러오기
watch(() => route.params.id, async (newId) => {
  console.log('[watch] route.params.id 변경됨:', newId)
  if (newId && newId !== sessionId.value) {
    sessionId.value = newId as string
    messages.value = []
    await loadChatHistory()
    chatSessions.value = await loadSessionList()
  }
})

</script>
