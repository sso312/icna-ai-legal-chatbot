<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCookie, useRuntimeConfig } from '#imports'

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const token = useCookie('icna_token')
const chatSessions = ref<any[]>([])

const searching = ref(false)
const searchKeyword = ref('')
const searchResults = ref<any[]>([])
const dropdownOpenId = ref<string | null>(null)
const editingId = ref<string | null>(null)
const editedTitle = ref('')

const currentId = computed(() => route.params.id)

async function fetchSessions() {
  const res = await fetch(`${config.public.apiBase}/chat-sessions/sessions`, {
    headers: { Authorization: `Bearer ${token.value}` }
  })
  const data = await res.json()
  chatSessions.value = data.sessions
}

onMounted(() => {
  fetchSessions()
  window.addEventListener('new-session', fetchSessions)
  document.addEventListener('click', closeMenus)
})

function toggleSearch() {
  searching.value = !searching.value
  searchKeyword.value = ''
  searchResults.value = []
}

async function performSearch() {
  if (!searchKeyword.value.trim()) return
  const res = await fetch(`${config.public.apiBase}/chat/search-global`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.value}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ keyword: searchKeyword.value })
  })
  const data = await res.json()
  searchResults.value = data.results
}

async function createSession() {
  const res = await fetch(`${config.public.apiBase}/chat-sessions/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({ title: '새 채팅' }),
  })
  const data = await res.json()
  await fetchSessions()
  goToSession(data.session._id)
}

function goToSession(id: string) {
  searching.value = false
  searchKeyword.value = ''
  searchResults.value = []
  router.push(`/chat/${id}`)
}

function toggleMenu(id: string) {
  dropdownOpenId.value = dropdownOpenId.value === id ? null : id
}

function closeMenus() {
  dropdownOpenId.value = null
}

function startEdit(id: string, currentTitle: string) {
  editingId.value = id
  editedTitle.value = currentTitle
  dropdownOpenId.value = null
}

async function saveEdit(id: string) {
  const newTitle = editedTitle.value.trim()
  if (!newTitle) return
  const res = await fetch(`${config.public.apiBase}/chat-sessions/session/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token.value}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: newTitle })
  })
  if (res.ok) {
    editingId.value = null
    await fetchSessions()
  }
}

async function deleteSession(id: string) {
  if (!confirm('이 채팅을 삭제하시겠습니까?')) return
  const res = await fetch(`${config.public.apiBase}/chat-sessions/session/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token.value}` }
  })
  if (res.ok) {
    await fetchSessions()
    if (currentId.value === id) router.push('/')
  }
}
</script>

<template>
  <aside class="w-64 pt-16 p-4 bg-gradient-to-b from-blue-50 to-white shadow-lg rounded-lg border-r border-blue-100 h-screen">
    <!-- 헤더 -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">채팅 목록</h2>
      <div class="flex gap-2">
        <button @click="createSession" class="text-sm text-blue-500">+ 새 채팅</button>
        <button @click="toggleSearch" class="text-sm text-blue-500">🔍</button>
      </div>
    </div>

    <!-- 검색창 -->
    <div v-if="searching" class="mb-2">
      <input
        v-model="searchKeyword"
        @keydown.enter="performSearch"
        placeholder="채팅 검색..."
        class="w-full px-2 py-1 border rounded"
      />
    </div>

    <!-- ✅ 스크롤 가능한 영역 -->
    <div class="overflow-y-auto max-h-[calc(100vh-160px)] pr-1">
      <ul v-if="searching && searchResults.length">
        <li v-for="msg in searchResults" :key="msg._id">
          <button
            class="w-full text-left text-sm py-1 px-2 hover:bg-gray-100 rounded"
            @click="goToSession(msg.chatId)"
          >
            {{ msg.text.slice(0, 10) + (msg.text.length > 10 ? '...' : '') }}
            - {{ new Date(msg.timestamp).toLocaleDateString() }}
          </button>
        </li>
      </ul>

      <ul v-else>
        <li
          v-for="session in chatSessions"
          :key="session._id"
          class="relative group flex justify-between items-center"
        >
          <div class="flex-1">
            <input
              v-if="editingId === session._id"
              v-model="editedTitle"
              @keyup.enter="saveEdit(session._id)"
              @blur="editingId = null"
              @keyup.esc="editingId = null"
              class="w-full px-2 py-1 rounded border border-blue-400 text-sm"
              autofocus
            />
            <button
              v-else
              class="w-full text-left px-3 py-2 rounded transition-all duration-150"
              :class="[
                session._id === currentId
                  ? 'bg-blue-100 shadow-inner font-semibold text-blue-700'
                  : 'hover:bg-blue-100 hover:text-blue-700 transition'
              ]"
              @click="goToSession(session._id)"
            >
              {{ session.title }}
            </button>
          </div>

          <div class="relative">
            <button
              @click.stop="toggleMenu(session._id)"
              class="px-2 text-gray-400 hover:text-gray-600"
            >
              ⋯
            </button>
            <div
              v-if="dropdownOpenId === session._id"
              class="absolute right-0 mt-1 w-32 bg-white border shadow rounded text-sm z-10"
            >
              <button
                class="block w-full text-left px-3 py-1 hover:bg-gray-100"
                @click="startEdit(session._id, session.title)"
              >
                제목 수정
              </button>
              <button
                class="block w-full text-left px-3 py-1 text-red-500 hover:bg-red-100"
                @click="deleteSession(session._id)"
              >
                삭제
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>
