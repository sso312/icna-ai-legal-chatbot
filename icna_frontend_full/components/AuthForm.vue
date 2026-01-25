<template>
  <form @submit.prevent="submit" class="space-y-4">
    <div v-for="field in fields" :key="field">
      <label :for="field" class="block text-sm font-medium capitalize">{{ field }}</label>
      <input
        v-model="form[field]"
        :type="field.includes('password') ? 'password' : 'text'"
        :placeholder="field"
        class="w-full border rounded-lg p-2"
      />
    </div>
    <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg">{{ buttonText }}</button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const props = defineProps<{ fields: string[]; buttonText: string }>()
const emit = defineEmits<{
  (e: 'submit', payload: Record<string, string>): void
}>()
const form = reactive<Record<string,string>>({})
props.fields.forEach(f => (form[f] = ''))
function submit() { emit('submit', { ...form }) }
</script>