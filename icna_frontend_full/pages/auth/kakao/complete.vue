<template>
  <div class="max-w-md mx-auto mt-16 p-8 bg-white shadow rounded">
    <h2 class="text-xl mb-4">추가 정보 입력</h2>
    <AuthForm
      @submit="onComplete"
      :fields="['email','name']"
      buttonText="완료하기"
    />
  </div>
</template>
<script setup lang="ts">
import AuthForm from '~/components/AuthForm.vue';
import { useRouter, useRoute } from 'vue-router';
import { useCookie, useRuntimeConfig } from '#imports';

const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
// URL 쿼리에서 토큰 꺼내서 쿠키에 저장
const tokenCookie = useCookie('icna_token', {
  path: '/',
  sameSite: 'lax'
})
const incoming = String(route.query.token || '')
if (incoming) {
  tokenCookie.value = incoming
}
async function onComplete(payload: Record<string,string>) {
    const token = tokenCookie.value
    if (!token) {
        alert('유효한 인증 정보가 없습니다. 다시 로그인해주세요.')
        return router.push('/auth/login')
    }
  try {
    await $fetch(
      `${config.public.apiBase}/auth/complete-profile`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
        body: payload
      }
    )

  } catch (err) {
      alert(err)
    console.error('프로필 완료 실패', err)
    alert('프로필 정보를 다시 확인해주세요.')
  }
}
</script>
