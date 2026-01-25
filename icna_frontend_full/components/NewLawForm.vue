<template>
  <div v-if="isAdmin" class="p-4 bg-white shadow rounded mb-6">
    <h3 class="text-lg font-semibold mb-2">새 법령 등록</h3>
    <form @submit.prevent="submitLaw">
      <input v-model="form.title" placeholder="제목" class="w-full border p-2 rounded mb-2" />
      <textarea v-model="form.summary" placeholder="요약" class="w-full border p-2 rounded mb-2" rows="3" />
      <input v-model="form.publishedDate" type="date" class="mb-2" />
      <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">등록</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { useRuntimeConfig } from '#imports'
import { useAuth } from '~/composables/useAuth'
const { isAdmin } = useAuth()
const config = useRuntimeConfig()
const form = reactive({ title: '', summary: '', publishedDate: '' })
async function submitLaw() {
  await $fetch(`${config.public.apiBase}/laws`, { method: 'POST', body: form })
  // ideally refresh list
}
</script>
