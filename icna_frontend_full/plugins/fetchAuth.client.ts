// plugins/fetchAuth.client.ts
import { useCookie } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie('icna_token')
  // 전역 프로퍼티로 등록
  nuxtApp.vueApp.config.globalProperties.$authFetch = (url: string, opts: any = {}) => {
    const headers = {
      ...(opts.headers || {}),
      Authorization: token.value ? `Bearer ${token.value}` : ''
    }
    return nuxtApp.$fetch(url, { ...opts, headers })
  }
})
