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
  if (error instanceof Error) {
    switch(error.message) {
      case '401':
        // 這邊處理登入權限已失效的狀況，用一個函數來處理所有資料的清除，以及重導向
        throw new Error(`登入權限已失效`)
      default:
        throw new Error(error.message || "發生某些 HTTP 問題")
    }
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