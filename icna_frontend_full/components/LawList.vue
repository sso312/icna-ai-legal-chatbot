<template>
  <!-- 전체 컨테이너 -->
  <div class="max-w-3xl mx-auto p-4">
    <!-- 고정 탭 바 -->
    <div class="h-auto sticky top-0 bg-white z-10 border-b rounded shadow-sm pb-3">
      <div class="flex space-x-4 mb-2 pt-2 p-5">
        <button
          v-for="cat in categories"
          :key="cat.key"
          @click="currentCategory = cat.key"
          :class="[
            currentCategory === cat.key
              ? 'border-b-2 border-blue-500 font-bold'
              : 'text-gray-500 hover:text-black'
          ]"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- 검색창 + 정렬 + 태그 필터 -->
      <div class="flex flex-col gap-2 p-5">
        <input
          v-model="keyword"
          type="text"
          placeholder="법령명, 부처명 등 검색"
          class="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <div class="flex justify-between items-center text-sm">
          <select v-model="sortOrder" class="border px-2 py-1 rounded">
            <option value="시행일자_desc">📅 시행일자 최신순</option>
            <option value="시행일자_asc">📅 시행일자 오래된순</option>
            <option value="공포일자_desc">📢 공포일자 최신순</option>
            <option value="공포일자_asc">📢 공포일자 오래된순</option>
          </select>

          <div class="flex flex-wrap gap-1 items-center">
            <span class="mr-1">📂 법령종류:</span>
            <button
              v-for="type in uniqueTypes"
              :key="type"
              @click="toggleType(type)"
              :class="[
                'px-2 py-1 rounded border text-xs',
                selectedTypes.includes(type)
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300'
              ]"
            >
              {{ type }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 스크롤 가능한 내용 -->
    <div class="overflow-y-auto max-h-[75vh] space-y-4 mt-4 pr-1 pb-40">
      <div
        v-for="law in filteredLaws"
        :key="law._id"
        class="p-4 border rounded-lg shadow hover:bg-gray-50"
      >
        <h2 class="text-lg font-semibold" v-html="highlight(law.법령명)"></h2>
        <p class="text-sm text-gray-600">
          {{ highlight(law.소관부처) }} • {{ law.제정개정구분 }} • {{ law.법령종류 }}
        </p>
        <p class="text-xs mt-1 text-gray-500">
          공포일자: {{ law.공포일자 }} / 시행일자: {{ law.시행일자 }}
        </p>
        <a
          :href="law.상세링크"
          target="_blank"
          class="text-blue-600 text-sm mt-2 inline-block"
        >
          상세보기 ↗
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRuntimeConfig } from '#app'

// 탭 카테고리
const categories = [
  { key: 'upcoming', label: '시행 예정' },
  { key: 'enforced', label: '최근 시행' },
  { key: 'announced', label: '최근 공포' }
]

const currentCategory = ref('upcoming')
const lawData = ref<any[]>([])
const isLoading = ref(false)
const error = ref(null)

// 필터 관련
const keyword = ref('')
const sortOrder = ref<'시행일자_desc' | '시행일자_asc' | '공포일자_desc' | '공포일자_asc'>('시행일자_desc')
const selectedTypes = ref<string[]>([])

// API 불러오기
const config = useRuntimeConfig()
const fetchLaws = async () => {
  isLoading.value = true
  error.value = null
  try {
    const url = `${config.public.apiBase}/law/${currentCategory.value}`
    lawData.value = await $fetch(url)
    console.log(`✅ [${currentCategory.value}] 불러온 법령`, lawData.value.length, '건')
  } catch (err) {
    console.error(err)
    error.value = '불러오기 실패'
  } finally {
    isLoading.value = false
  }
}
watch(currentCategory, fetchLaws)
onMounted(fetchLaws)

// 법령종류 추출
const uniqueTypes = computed(() => {
  const set = new Set(lawData.value.map(l => l.법령종류).filter(Boolean))
  return [...set]
})

// 태그 필터 toggle
function toggleType(type: string) {
  if (selectedTypes.value.includes(type)) {
    selectedTypes.value = selectedTypes.value.filter(t => t !== type)
  } else {
    selectedTypes.value.push(type)
  }
}

// 하이라이트 함수
function highlight(text: string = ''): string {
  if (!keyword.value) return text
  const regex = new RegExp(`(${keyword.value})`, 'gi')
  return text.replace(regex, `<mark class="bg-yellow-200">$1</mark>`)
}

// 필터 + 정렬된 법령 목록
const filteredLaws = computed(() => {
  let result = [...lawData.value]

  // 검색 필터
  if (keyword.value.trim()) {
    const kw = keyword.value.trim()
    result = result.filter(l =>
      l.법령명.includes(kw) ||
      l.소관부처.includes(kw) ||
      l.법령종류.includes(kw)
    )
  }

  // 법령종류 필터
  if (selectedTypes.value.length > 0) {
    result = result.filter(l => selectedTypes.value.includes(l.법령종류))
  }

  // 정렬
  result.sort((a, b) => {
    const field = sortOrder.value.includes('시행일자') ? '시행일자' : '공포일자'
    const dir = sortOrder.value.endsWith('asc') ? 1 : -1
    return (new Date(a[field]).getTime() - new Date(b[field]).getTime()) * dir
  })

  return result
})
</script>
