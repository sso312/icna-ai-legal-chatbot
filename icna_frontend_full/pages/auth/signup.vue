<template>
  <div class="max-w-md mx-auto mt-16 p-8 bg-white shadow-lg rounded-lg">
    <h2 class="text-xl font-semibold mb-6">회원가입</h2>
    <AuthForm @submit="onSignup" :fields="['name','email','password']" buttonText="가입하기" />
    <p class="mt-4 text-sm text-gray-600">이미 계정이 있으신가요? <NuxtLink to="/auth/login" class="text-blue-600">로그인</NuxtLink></p>
  </div>
</template>
<script setup lang="ts">
import AuthForm from '~/components/AuthForm.vue'
import { useRouter } from 'vue-router'
const config = useRuntimeConfig()
const router = useRouter()
async function onSignup(values: Record<string,string>) {
  await $fetch(`${config.public.apiBase}/auth/signup`, { method: 'POST', body: values,headers: {
      'Content-Type': 'application/json'
    }, credentials: 'include' })
  await router.push('/auth/login')
}
</script>