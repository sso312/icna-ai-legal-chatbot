<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
    <ChatWindow class="w-full max-w-2xl h-[calc(100vh-64px)]" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
import ChatWindow from '~/components/ChatWindow.vue'
</script>
