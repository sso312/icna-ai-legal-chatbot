// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
    // icna_token 쿠키가 없으면 로그인 페이지로 리다이렉트
    const token = useCookie('icna_token').value
    if (!token) {
      return navigateTo('/auth/login')
    }
  })
  