import { useStorage } from '@vueuse/core'


export default function useAuth() {
  const TOKEN_KEY = 'strapi_token'
  const tokenRef = useStorage(TOKEN_KEY, "")

  const getToken = () => tokenRef.value

  const setToken = (token: string) => tokenRef.value = token
  
  const clearToken = () => tokenRef.value = ""

  const isAuthenticated = computed(() => getToken() !== "")

  return {
    getToken,
    setToken,
    clearToken,
    isAuthenticated
  }
}

