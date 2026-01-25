<template>
  <div :class="['flex flex-col', isUser ? 'items-end' : 'items-start']">
    <div
      :class="[
        'max-w-xs p-3 rounded-lg',
        isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
      ]"
    >
      <div v-html="formattedText"></div>
      <br />
      <small class="text-xs mt-1 opacity-70">{{ formatRelativeTime(timestamp) }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text: string
  isUser: boolean
  timestamp?: string
}>()

function formatRelativeTime(isoString?: string): string {
  const now = new Date()
  const time = isoString ? new Date(isoString) : new Date()
  const diff = Math.floor((now.getTime() - time.getTime()) / 1000)

  if (diff < 60) return '방금 전'
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
  return `${Math.floor(diff / 86400)}일 전`
}

const formattedText = computed(() => {
  return props.text
    .replace(/\\n/g, '\n')                                 // 이스케이프된 \n → 실제 줄바꿈
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')      // 굵게 처리
    .replace(/\n\s*\n/g, '<br><br>')                        // 문단 구분
    .replace(/\n/g, ' ')                                    // 나머지 단일 줄바꿈 → 공백
})
</script>
