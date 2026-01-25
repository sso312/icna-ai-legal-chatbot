// ex: ~/composables/useLaw.ts
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
export const useLaw = async (category: 'upcoming' | 'enforced' | 'announced') => {
  const { data } = await useFetch(`${config.public.apiBase}/law/${category}`);
  return data.value;
}
