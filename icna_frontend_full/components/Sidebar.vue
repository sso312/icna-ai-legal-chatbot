<template>
  <aside class="pt-16 w-64 p-4 bg-gradient-to-b from-blue-50 to-white shadow-xl rounded-xl h-full border-r border-blue-100">
    <h2 class="text-2xl font-bold mb-6 text-blue-700">ICNA 메뉴</h2>

    <section class="mb-8">
      <h3 class="font-semibold text-blue-600 mb-2">법령 정보</h3>
      <ul class="space-y-2 text-gray-800">
        <li>
          <NuxtLink to="/law" class="block px-3 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition">
            📚 최신 법령
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/LifeLaw" class="block px-3 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition">
            📚 생활 법령 
          </NuxtLink>
        </li>
      </ul>
    
    </section>

    <section class="mb-8">
      <h3 class="font-semibold text-blue-600 mb-2">판례 정보</h3>
      <ul class="space-y-2 text-gray-800">
        <li>
          <NuxtLink to="/case" class="block px-3 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition">
            🧾 판례 열람하기
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section>
      <h3 class="font-semibold text-blue-600 mb-2">국가 법률 혜택</h3>
      <ul class="space-y-2 text-gray-800">
        <li>
          <NuxtLink to="/benefit" class="block px-3 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition">
            🏛️ 법률 혜택 안내
          </NuxtLink>
        </li>
      </ul>
    </section>
  </aside>
</template>


<style scoped>
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#imports'

// API 베이스 URL
const config = useRuntimeConfig()

// laws와 cases를 둘 다 선언
// const laws = ref<any[]>([])
// const cases = ref<any[]>([])
//
// onMounted(() => {
//   laws.value = [
//     { id: 1, title: '정보통신망법 제1조' },
//     { id: 2, title: '정보통신망법 제2조' },
//   ]
//
//   cases.value = [
//     { id: 1, title: '사건 2020도...' },
//     { id: 2, title: '사건 2021고...' },
//   ]
// })

</script>