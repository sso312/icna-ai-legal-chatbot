<template>
  <div class="max-w-3xl mx-auto p-4">
    <!-- Q&A 탭 -->
    <div class="sticky top-0 bg-white z-10 border-b rounded shadow-sm pb-3">
      <div
        class="flex flex-wrap gap-3 mb-4 pt-4 px-4 justify-center"
      >
        <button
          v-for="cat in qaCategories"
          :key="cat"
          @click="currentQACategory = cat"
          :class="[
            'px-6 py-2 text-sm rounded font-semibold text-center shadow-sm transition',
            currentQACategory === cat
              ? 'border-b-2 border-blue-500 text-blue-700 bg-blue-50'
              : 'text-gray-600 bg-gray-100 hover:text-blue-600 hover:bg-blue-100'
          ]"
          style="min-width: 120px; max-width: 240px; white-space: normal; word-break: keep-all;"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Q&A 리스트 -->
    <div class="overflow-y-auto max-h-[75vh] space-y-4 mt-4 pr-1 pb-40">
      <div
        v-for="(qa, idx) in qaList"
        :key="qa.question"
        class="p-4 border rounded-lg bg-white shadow hover:bg-gray-50 cursor-pointer"
        @click="toggleAnswer(idx)"
      >
        <h3 class="font-semibold text-base flex items-center">
          <span class="mr-2">❓</span>
          <span>{{ qa.question }}</span>
          <span class="ml-auto text-xs text-gray-400" v-if="openedIndex === idx">▲</span>
          <span class="ml-auto text-xs text-gray-400" v-else>▼</span>
        </h3>
        <transition name="fade">
          <p
            v-if="openedIndex === idx"
            class="mt-2 text-gray-700 text-sm whitespace-pre-wrap"
            v-html="'💬 ' + breakBySymbols(qa.answer)"
          ></p>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'

// Q&A 카테고리 정의
const qaCategories = [
  '개인정보', '무인비행장치', '분야별개인정보',
  '인터넷개인방송', '인터넷명예훼손', '불법이용규제',
  '특허권', '휴대전화이용자'
]
interface QA {
  question: string
  answer: string
}
const currentQACategory = ref(qaCategories[0])
const qaList = ref<any[]>([])
const openedIndex = ref<number | null>(null)

const config = useRuntimeConfig()

const fetchQAs = async () => {
  try {
    const url = `http://localhost:5050/api/qa?category=${encodeURIComponent(currentQACategory.value)}`
    const res = await $fetch<QA[]>(url)
    qaList.value = res
    openedIndex.value = null // 카테고리 바뀌면 모두 닫힘
  } catch (e) {
    console.error('❌ Q&A 불러오기 실패:', e)
  }
}

function toggleAnswer(idx: number) {
  openedIndex.value = openedIndex.value === idx ? null : idx
}

// "☞"나 "◇" 기호 앞에 <br>을 추가해서 줄바꿈 처리
function breakBySymbols(answer: string) {
  if (!answer) return ''
  // ☞ 또는 ◇ 앞에 항상 줄바꿈
  return answer
    .replace(/ *☞/g, '<br>☞')
    .replace(/ *◇/g, '<br>◇')
    .replace(/^\s*<br>/, ''); // 만약 맨 앞에 <br> 생기면 제거
}

watch(currentQACategory, fetchQAs)
onMounted(fetchQAs)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
