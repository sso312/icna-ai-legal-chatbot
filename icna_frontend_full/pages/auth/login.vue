<!-- pages/auth/login.vue -->
<template>
  <div class="max-w-md mx-auto mt-16 p-8 bg-white shadow-lg rounded-lg">
    <h2 class="text-xl font-semibold mb-6">로그인</h2>
    <AuthForm @submit="onLogin" :fields="['email','password']" buttonText="로그인" />
    <div class="mt-4 text-center">
      <KakaoLoginButton />
    </div>
    <p class="mt-4 text-sm text-gray-600">
      계정이 없으신가요?
      <NuxtLink to="/auth/signup" class="text-blue-600">회원가입</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import AuthForm from '~/components/AuthForm.vue'
import KakaoLoginButton from '~/components/KakaoLoginButton.vue'
import { useRouter, useCookie, useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const router = useRouter()

type LoginResponse = {
  accessToken: string
  message: string
}

async function onLogin(values: Record<string, string>) {
  try {
    const response = await $fetch<LoginResponse>(`${config.public.apiBase}/auth/login`, {
      method: 'POST',
      body: values,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    // 응답에서 accessToken 추출
    const tokenCookie = useCookie('icna_token')
    tokenCookie.value = response.accessToken

    // 로그인 성공 후 이동

    await router.push('/chat')
  } catch (error: any) {
    console.error('로그인 실패:', error.data || error)
    alert(error.data?.message || '로그인 중 오류 발생')
  }
}
// async function onLogin(values: Record<string,string>) {
//   // 백엔드에서 { token: string } 형태로 응답받는다고 가정
//   const { data } = await $fetch(
//   `${config.public.apiBase}/auth/login`,
//   { method: 'POST', body: values,headers: {
//       'Content-Type': 'application/json'
//     }, credentials: 'include' }
//   );
//   // 쿠키에 토큰 저장
//   useCookie('icna_token').value = data.accessToken
//   // 인증 후 챗 페이지로 이동
//   await router.push('/chat')
// }
</script>
