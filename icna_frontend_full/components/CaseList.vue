<template>
  <div class="max-w-4xl mx-auto h-screen overflow-y-auto bg-gray-50">
    <!-- 상단 고정 헤더 -->
    <div class="sticky top-0 z-10 bg-white p-4 shadow-md space-y-4 rounded">
      <h1 class="text-2xl font-bold text-indigo-700">정보통신망법 관련 판례</h1>

      <!-- 검색창 -->
      <input
        v-model="keyword"
        type="text"
        placeholder="사건명 또는 사건번호 검색"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <!-- 정렬 / 필터 -->
      <div class="flex flex-wrap gap-4 items-center">
        <select v-model="sortOrder" class="border rounded px-2 py-1 text-sm">
          <option value="desc">📅 최신순</option>
          <option value="asc">📅 오래된순</option>
        </select>

        <div class="flex flex-wrap gap-2 items-center text-sm">
          <span class="font-medium">📂 판결유형:</span>
          <button
            v-for="type in uniqueTypes"
            :key="type"
            @click="toggleTypeFilter(type)"
            :class="[
              'px-2 py-1 rounded border',
              selectedTypes.includes(type)
                ? 'bg-indigo-500 text-white border-indigo-500'
                : 'bg-white text-gray-700 border-gray-300'
            ]"
          >
            {{ type }}
          </button>
        </div>
      </div>
    </div>

    <!-- 본문 -->
    <div class="p-4 space-y-4 pb-40">
      <div v-if="loading" class="text-gray-500">불러오는 중입니다...</div>
      <div v-else-if="filteredCases.length === 0" class="text-red-500">판례가 없습니다.</div>

      <div
        v-else
        v-for="(item, idx) in filteredCases"
        :key="idx"
        class="bg-white border rounded-lg shadow p-4 hover:bg-gray-50 transition"
      >
        <h2 class="font-semibold text-lg text-gray-800" v-html="highlight(item.사건명)"></h2>
        <p class="text-sm text-gray-600">📌 사건번호: <span v-html="highlight(item.사건번호)"></span></p>
        <p class="text-sm text-gray-600">
          📅 {{ item.선고일자 }} |
          🏛️ {{ item.법원명 }} |
          🧾 {{ item.판결유형 }}
        </p>
        <button
  @click="summarize(item, idx)"
  class="mt-3 text-sm text-white bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700"
>
  🧠 쉬운말로 보기
</button>

<div v-if="summaries[idx]" class="mt-3 p-3 bg-gray-100 border rounded text-sm whitespace-pre-line">
  <strong>📝 요약 결과:</strong>
  <div class="mt-1">{{ summaries[idx] }}</div>
</div>

<div v-if="loadingIdx === idx" class="mt-2 text-xs text-gray-500">요약 중...</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCase } from '~/composables/useCase'
import { ref, computed, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
// 상태 변수
const loading = ref(true)
const cases = ref<any[]>([])
const keyword = ref('')
const sortOrder = ref<'asc' | 'desc'>('desc')
const selectedTypes = ref<string[]>([])
const summaries = ref<string[]>([])
const loadingIdx = ref<number | null>(null)
// 데이터 불러오기
onMounted(async () => {
  const data = await useCase()
  cases.value = data || []
  loading.value = false
})

async function summarize(item: any, idx: number) {
  if (!item.caseDetails) {
    alert('요약할 수 있는 판례 상세 정보가 없습니다.')
    return
  }

  loadingIdx.value = idx
  summaries.value[idx] = ''

  try {
    const res = await $fetch(`${config.public.apiBase}/prec/summarize`, {
      method: 'POST',
      body: {
        caseDetails: item.caseDetails
      }
    })
    console.log('GPT 응답:', res)
    summaries.value[idx] = res.summary
  } catch (err) {
    console.error('요약 오류:', err)
    summaries.value[idx] = '요약 실패: ' + err
  } finally {
    loadingIdx.value = null
  }
}



// 판결유형 리스트 추출
const uniqueTypes = computed(() => {
  const types = new Set(cases.value.map(c => c.판결유형).filter(Boolean))
  return [...types]
})

// 판결유형 필터 선택 토글
function toggleTypeFilter(type: string) {
  if (selectedTypes.value.includes(type)) {
    selectedTypes.value = selectedTypes.value.filter(t => t !== type)
  } else {
    selectedTypes.value.push(type)
  }
}

// 검색어 하이라이트 함수
function highlight(text: string): string {
  if (!keyword.value) return text
  const safeKeyword = keyword.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // 정규식 이스케이프
  const regex = new RegExp(`(${safeKeyword})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>')
}

// 정렬 및 필터 적용된 판례 목록
const filteredCases = computed(() => {
  let result = [...cases.value]

  // 판결유형 필터
  if (selectedTypes.value.length > 0) {
    result = result.filter(c => selectedTypes.value.includes(c.판결유형))
  }

  // 검색 필터
  if (keyword.value.trim()) {
    const kw = keyword.value.trim()
    result = result.filter(
      c => c.사건명.includes(kw) || c.사건번호.includes(kw)
    )
  }

  // 날짜 정렬
  result.sort((a, b) => {
    const da = new Date(a.선고일자)
    const db = new Date(b.선고일자)
    return sortOrder.value === 'asc' ? da.getTime() - db.getTime() : db.getTime() - da.getTime()
  })

  return result
})
</script>
