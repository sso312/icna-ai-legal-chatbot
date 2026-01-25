
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">가입된 사용자 목록</h1>
    <table class="w-full border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border px-4 py-2">이메일</th>
          <th class="border px-4 py-2">가입일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td class="border px-4 py-2">{{ user.email }}</td>
          <td class="border px-4 py-2">{{ new Date(user.createdAt).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const users = ref([])

onMounted(async () => {
  try {
    const res = await fetch('/api/admin/users')
    users.value = await res.json()
  } catch (error) {
    alert('유저 목록을 불러오지 못했습니다.')
  }
})
</script>
