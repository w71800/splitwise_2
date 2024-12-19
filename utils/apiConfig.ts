import { useRuntimeConfig } from 'nuxt/app'

export const createApiConfig = () => {
  const config = useRuntimeConfig()
  const isProd = process.env.NODE_ENV === 'production'

  return {
    baseURL: isProd ? config.public.strapiHost : 'http://localhost:1337',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

export const handleApiError = async (error: unknown) => {
  // 處理 HTTP 錯誤
  if (error instanceof Response) {
    let errorData = await error.json()
    throw new Error(errorData.message || '伺服器錯誤')
  } 

  // 處理網路錯誤
  if (error instanceof TypeError) {
    console.error('Network Error:', error.message)
  } 
  
  if (error instanceof DOMException && error.name === 'AbortError') {
    console.error('Request Timeout')
  }

  throw error
}