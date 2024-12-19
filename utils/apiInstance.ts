import useAuth from '@/composables/auth'
import { createApiConfig, handleApiError } from './apiConfig'
const { getToken } = useAuth()

type TokenType = 'user' | 'api' | 'none'
interface FetchOptions extends RequestInit {
  tokenType?: TokenType
}

export const createFetchRequest = async (
  endpoint: string, 
  options: FetchOptions = {}
) => {
  const { baseURL, timeout } = createApiConfig()
  const config = useRuntimeConfig()

  const getAuthToken = (type: TokenType = 'user') => {
    if (type === 'user') return getToken()
    if (type === 'api') return config.public.strapiTokenDev
    return ''
  }

  const token = getAuthToken(options.tokenType)
  
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  try {
    const response = await fetch(`${baseURL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': token ? `Bearer ${token}` : '',
      },
      signal: controller.signal
    })

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`)
    // }

    return await response.json()
  } catch (error) {
    handleApiError(error)
  } finally {
    clearTimeout(timeoutId)
  }
}