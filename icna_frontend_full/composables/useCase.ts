// ~/composables/usecase.ts
import { useRuntimeConfig, useFetch } from '#imports'


export const useCase = async () => {
  const config = useRuntimeConfig()
  const { data } = await useFetch(`${config.public.apiBase}/case/list`)
  return data.value
}
