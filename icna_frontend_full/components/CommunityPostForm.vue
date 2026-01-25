<template>
    <div class="p-4 bg-white shadow rounded-lg mb-6">
      <h3 class="text-lg font-semibold mb-2">새 글 작성</h3>
      <form @submit.prevent="submitPost" enctype="multipart/form-data">
        <input
          v-model="form.title"
          placeholder="제목"
          class="w-full border p-2 rounded mb-2"
        />
        <textarea
          v-model="form.content"
          placeholder="내용"
          class="w-full border p-2 rounded mb-2"
          rows="4"
        />
        <input type="file" @change="onFileChange" class="mb-2" />
        <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">등록</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { useRuntimeConfig, useRouter } from '#imports'
  
  const config = useRuntimeConfig()
  const router = useRouter()
  const form = reactive({ title: '', content: '' })
  const file = ref<File|null>(null)
  
  function onFileChange(e: Event) {
    const target = e.target as HTMLInputElement
    file.value = target.files?.[0] || null
  }
  
  async function submitPost() {
    const data = new FormData()
    data.append('title', form.title)
    data.append('content', form.content)
    if (file.value) data.append('file', file.value)
    await $authFetch(`${config.public.apiBase}/community`, { method: 'POST', body: data })
    form.title = ''
    form.content = ''
    file.value = null
    router.push('/community')
  }
  </script>