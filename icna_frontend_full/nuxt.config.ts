export default defineNuxtConfig({
  devtools: true,
  vite: {
    server: {
      hmr: {
        clientPort: 3000,
      }
    }
  },
  telemetry: false,
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css'],
  plugins: [
    '~/plugins/fetchAuth.client.ts'
  ],
  runtimeConfig: {
    public: {
      // 프록시 경유 주소로 맞춰줘야 함
      apiBase: 'http://localhost:5050'
    }
  },
  nitro: {
    devProxy: {
      'http://localhost:5050': {
        target: 'http://localhost:5050',
        changeOrigin: true,
        prependPath: true
      }
    }
  }
})
