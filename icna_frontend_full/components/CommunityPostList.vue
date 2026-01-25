<template>
    <div>
      <div
        v-for="post in posts"
        :key="post.id"
        class="mb-4 p-4 bg-white shadow rounded-lg"
      >
        <NuxtLink :to="`/community/${post.id}`" class="text-xl font-semibold hover:underline">
          {{ post.title }}
        </NuxtLink>
        <p class="text-gray-600 text-sm">{{ post.createdAt }}</p>
        <p class="text-gray-700 mt-1">{{ post.content.slice(0, 100) }}...</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  const config = useRuntimeConfig()
  const posts = ref([])
  
  onMounted(async () => {
    const { data } = await $authFetch(`${config.public.apiBase}/community`)
    posts.value = data.value || []
  })
  </script>