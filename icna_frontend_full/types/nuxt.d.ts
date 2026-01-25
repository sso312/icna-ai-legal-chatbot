// types/nuxt.d.ts
import { NuxtApp } from 'nuxt/app'
import { FetchOptions } from 'ohmyfetch'

// Vue 컴포넌트 내부에서 this.$authFetch 쓸 수 있게
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $authFetch: (url: string, opts?: FetchOptions) => Promise<any>
  }
}

// useNuxtApp() 반환값에도 $authFetch 추가
declare module '#app' {
  interface NuxtApp {
    $authFetch: (url: string, opts?: FetchOptions) => Promise<any>
  }
}
