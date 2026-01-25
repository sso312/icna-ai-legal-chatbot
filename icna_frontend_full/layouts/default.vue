<template>
  <div class="relative flex h-screen bg-gray-50">
    <transition name="slide">
      <component
          v-if="showSidebar"
          :is="isChatPage ? ChatHistorySidebar : Sidebar"
          class="absolute top-0 left-0 h-full z-20 w-64 shadow-lg bg-white"
      />
    </transition>
    <div class="flex-1 flex flex-col">
      <header class="py-6 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 shadow-md flex justify-between items-center">
        <button @click="toggleSidebar" class="p-2 rounded hover:bg-indigo-500 bg-blue-50 text-blue-600 flex-shrink-0 z-30">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <NuxtLink to="/" class="absolute left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold no-underline hover:no-underline whitespace-nowrap">
          <span>{{ title }}</span>
        </NuxtLink>

        <!-- 인증 상태에 따른 네비게이션 -->
        <nav class="flex space-x-4 items-center text-white relative">
          <template v-if="!isAuthenticated">
            <NuxtLink to="/auth/login" class="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 font-semibold">로그인</NuxtLink>
            <NuxtLink to="/auth/signup" class="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 font-semibold">회원가입</NuxtLink>
          </template>
          <template v-else>
            <div class="relative">
              <button @click="showProfile = !showProfile" class="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 font-semibold">
                {{ user?.name || '프로필' }}
              </button>
              <div v-if="showProfile" class="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2 z-50">
                <div class="px-4 py-2 text-sm border-b">
                  <div class="font-medium">{{ user?.name }}</div>
                  <div class="text-gray-600">{{ user?.email }}</div>
                </div>
                <button @click="logout" class="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">로그아웃</button>
              </div>
            </div>
          </template>
        </nav>
      </header>

      <main class="flex-1 overflow-hidden">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from '~/components/Sidebar.vue'
import ChatHistorySidebar from '~/components/ChatHistorySidebar.vue'
import { useCookie, useRuntimeConfig } from '#app'
import { NuxtLink } from '#components'

const tokenCookie = useCookie('icna_token', {
  path: '/',
  sameSite: 'lax'
})
const isAuthenticated = computed(() => !!tokenCookie.value && !!user.value)
const config = useRuntimeConfig()
const router = useRouter()
const route = useRoute()
const showSidebar = ref(true)
const isChatPage = computed(() => /^\/chat(\/|$)/.test(route.path))
const title = computed(() => isChatPage.value ? 'ICNA · 챗봇' : 'ICNA · 이크나')

const user = ref<{ name: string; email: string } | null>(null)
const showProfile = ref(false)

async function fetchProfile() {
  if (!tokenCookie.value) return
  try {
    const { user: profile } = await $fetch<{ user: { name: string; email: string } }>(
      `${config.public.apiBase}/protected/profile`,
      {
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`
        },
        credentials: 'include'
      }
    )
    user.value = profile
  } catch (e) {
    console.error('프로필 불러오기 실패:', e)
  }
}

onMounted(fetchProfile)
watch(tokenCookie, fetchProfile)

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

function logout() {
  tokenCookie.value = null
  user.value = null
  router.push('/')
}
</script>

<style>
.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }
</style>
