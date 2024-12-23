import type { Record } from '@/types/types' 
import type { PostRecord } from '@/types/api'
import { formatPostRecord } from '@/utils/formatters'
import { useRecordsStore } from '@/store/records'
import { useUserDataStore } from '@/store/userData'
import useAuth from '@/composables/auth'
import { createFetchRequest } from './apiInstance'
import { concatApiEndpointUrl } from './utils'
const { getToken, setToken, clearToken } = useAuth()

interface LoginData {
  identifier: string
  password: string
}

interface SignupData {
  username: string
  displayName?: string
  email: string
  password: string
}

const handleApiError = async (error: unknown) => {
  const router = useRouter()
  // 處理 HTTP 錯誤
  if (error instanceof Error) {
    switch(error.message) {
      case '401':
        clearToken()
        router.push('/auth')
        alert('登入權限已過期，請重新登入！')
        throw new Error(`登入權限已過期，請重新登入！`)
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

const fetchRecords = async () => {
  const userDataStore = useUserDataStore()
  const { id: userId } = storeToRefs(userDataStore)

  const params = [
    'populate[participants][populate][participant][populate][avatar][fields]=url',
    'populate[participants][populate]=tags',
    'populate[payers][populate][payer][populate][avatar][fields]=url',
    'populate[divisions][populate][participant][populate][avatar][fields]=url',
    'populate[group][populate][members][fields]=id, documentId, username, email',
    'populate[group][populate][members][populate][avatar][fields]=url'
  ]
  params.push(`filters[participants][participant][documentId][$eq]=${userId.value}`)

  const endpoint = concatApiEndpointUrl('/records', params)
  try {
    const response = await createFetchRequest(endpoint, { tokenType: 'api' })
    return response.data
  } catch(e) {
    handleApiError(e)
    throw new Error(`取得紀錄時發生錯誤`)
  }
}

const fetchUserData = () => {
  const populateParams = [
    'populate[friends][populate]=*',
    'populate[groups][populate]=*',
    'populate[avatar][fields]=url',
    'populate[groups][populate][members][populate][avatar][fields]=url',
    'populate[groups][populate][avatar][fields]=url'
  ]
  
  const endpoint = concatApiEndpointUrl('/users/me', populateParams)
  try {
    return createFetchRequest(endpoint, { tokenType: 'user' })
  } catch(e) {
    handleApiError(e)
    throw new Error(`取得使用者資料時發生錯誤`)
  }
  
}

/**
 * @param record 
 * @returns promise of documentId
 */
const postRecord = async (record: Omit<Record, 'id'>): Promise<string> => {
  const postData = formatPostRecord(record)
  
  const endpoint = concatApiEndpointUrl('/records')
  try {
    const response = await createFetchRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(postData),
    })
    return response.data.documentId
  } catch(e) {
    handleApiError(e)
    throw new Error(`儲存紀錄時發生錯誤`)
  }
}

/**
 * Deletes a record from the database using the provided document ID.
 * 
 * @param documentId - The unique identifier of the record to be deleted
 * @throws {Error} If the deletion request fails
 * @returns {Promise<void>} A promise that resolves when the record is successfully deleted
 */
const deleteRecord = async (documentId: string) => {
  const endpoint = concatApiEndpointUrl(`/records/${documentId}`)
  try {
    await createFetchRequest(endpoint, {
      method: 'DELETE',
      tokenType: 'api'
    })
  } catch(e) {
    handleApiError(e)
    throw new Error(`刪除紀錄時發生錯誤`)
  }
}

// 成功的話，會回傳該紀錄於 strapi 的 documentId，後續看看如何使用（例如：更新 pinia 的紀錄。但是 pinia 應該已經一起編輯好了）
const updateRecord = async (documentId: string): Promise<string> => {
  const token = getToken()
  const { getRecordById } = useRecordsStore()
  const updateData = formatPostRecord(getRecordById(documentId)!)
  
  if (!updateData) {
    throw new Error("Record not found")
  }

  const endpoint = concatApiEndpointUrl(`/records/${documentId}`)
  try {
    const response = await createFetchRequest(endpoint, {
      method: 'PUT',
      tokenType: 'api',
      body: JSON.stringify(updateData)
    })
    return response.data.documentId
  } catch(e) {
    handleApiError(e)
    throw new Error(`更新紀錄時發生錯誤`)
  }

  // return await fetch(endpointUrl(`records/${documentId}`), {
  //   method: 'PUT',
  //   body: JSON.stringify(updateData),
  //   headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  // })
  // .then(res => {
  //   if (!res.ok || res.status !== 200) {
  //     throw new Error("Failed to update record in strapi")
  //   }
  //   return res.json().then(data => data.data.documentId)
  // })
  // .catch(error => {
  //   throw error // 抓取其餘網路連接錯誤
  // })
}
// 成功的話回傳資料（含有 token）；失敗的話拋出狀態碼和錯誤
const login = async (data: LoginData) => {
  const endpoint = concatApiEndpointUrl('/auth/local')
  try {
    const response = await createFetchRequest(endpoint, {
      method: 'POST',
      tokenType: 'api',
      body: JSON.stringify(data) // 這邊 strapi 是吃 identifier 和 password
    })
    setToken(response.jwt)
    
    return response
  } catch(e) {
    handleApiError(e)
    throw new Error(`登入時發生錯誤`)
  }
  // return await fetch(endpointUrl('auth/local'), {
  //   method: 'POST',
  //   body: JSON.stringify(data), // 這邊 strapi 是吃 identifier 和 password
  //   headers: { 
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   }
  // })
  // .then(res => {
  //   if (!res.ok) {
  //     const error = new Error(`登入失敗（${res.status}）`)
  //     error.cause = { status: res.status, statusText: res.statusText }
  //     throw error
  //   }
  //   return res.json()
  // }).then( data => {
  //   setToken(data.jwt)
  //   return data
  // })
  // .catch(error => {
  //   if (error instanceof Error && error.cause) {
  //     throw error
  //   }
  //   else {
  //     throw new Error('網路連接異常')
  //   }
  // })

  
}

const signup = async (data: SignupData) => {
  const endpoint = concatApiEndpointUrl('/auth/local/register')
  try {
    return await createFetchRequest(endpoint, {
      method: 'POST',
      tokenType: 'api',
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }) // 這邊 strapi 是吃 identifier 和 password
    })
  } catch(e) {
    handleApiError(e)
    throw new Error(`註冊時發生錯誤`)
  }
  // return await fetch(endpointUrl('auth/local/register'), {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     username: data.username,
  //     email: data.email,
  //     password: data.password,
  //   }),
  //   headers: { 
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   }
  // })
  // .then(async res => {
  //   if (!res.ok) {
  //     const error = new Error(`註冊失敗（${res.status}）`)
  //     const errorData = await res.json()
  //     error.cause = { status: res.status, statusText: res.statusText }
  //     error.message = error.message + `：${errorData.error.message}`
  //     throw error
  //   }
  //   return res.json()
  // })
  // .catch(error => {
  //   if (error instanceof Error && error.cause) {
  //     throw error
  //   }
  //   else {
  //     throw new Error('網路連接異常')
  //   }
  // })
}


export {
  fetchRecords,
  fetchUserData,
  postRecord,
  deleteRecord,
  updateRecord,
  login,
  signup,
}