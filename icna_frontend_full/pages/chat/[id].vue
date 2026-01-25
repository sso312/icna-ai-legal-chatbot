<template>
  <ChatWindow :sessionId="sessionId" />
</template>

<script setup lang="ts">
import ChatWindow from '~/components/ChatWindow.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sessionId = route.params.id as string
</script>
