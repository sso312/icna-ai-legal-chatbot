import { ref, onMounted } from 'vue'
import { useRuntimeConfig, useFetch } from '#imports'

export function useAuth() {
  const config = useRuntimeConfig()
  const isAdmin = ref(false)
  onMounted(async () => {
    try {
      // /auth/me endpoint returns user data; adjust nesting as needed
      const { data } = await useFetch(`${config.public.apiBase}/auth/me`)
      const userData = data.value || {}
      // Some backends wrap user in `user` key
      const role = userData.role ?? userData.user?.role
      isAdmin.value = role === 'admin'
    } catch (err) {
      isAdmin.value = false
    }
  })
  return { isAdmin }
}