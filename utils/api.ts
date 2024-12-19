import type { Record } from '@/types/types' 
import type { PostRecord } from '@/types/api'
import { formatPostRecord } from '@/utils/formatters'
import { useRecordsStore } from '@/store/records'
import { useUserDataStore } from '@/store/userData'
import useAuth from '@/composables/auth'
import { createFetchRequest } from './apiInstance'
const { getToken, setToken } = useAuth()

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

const endpointUrl = (resource: string, populates?: string[]) => {
  const config = useRuntimeConfig()
  const { strapiHost } = config.public 
  // return `${strapiHost}/api/${resource}${populates ? `?${populates.join('&')}` : ''}`
  return `/api/${resource}${populates ? `?${populates.join('&')}` : ''}`
}

const fetchRecords = async () => {
  const config = useRuntimeConfig()
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

  const endpoint = endpointUrl('records', params)

  const data = await createFetchRequest(endpoint, { tokenType: 'api' })
  return data.data
  
  // const token = config.public.strapiTokenDev

  // return fetch(endpoint, {
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // })
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error('Failed to fetch records')
  //     }
  //     return res.json().then(data => data.data)
  //   })
  //   .catch((error) => {
  //     throw new Error(error.message)
  //   })
}

const fetchUserData = () => {
  const token = getToken()

  const populateParams = [
    'populate[friends][populate]=*',
    'populate[groups][populate]=*',
    'populate[avatar][fields]=url',
    'populate[groups][populate][members][populate][avatar][fields]=url',
    'populate[groups][populate][avatar][fields]=url'
  ]

  const endpoint = endpointUrl('users/me', populateParams)
  return createFetchRequest(endpoint, { tokenType: 'user' })
  // return fetch(endpoint, {
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // })
  // .then(res => res.json())
  // .catch(error => {
  //   throw error
  // })
}

/**
 * 
 * @param record 
 * @returns promise of documentId
 */
const postRecord = async (record: Omit<Record, 'id'>): Promise<string> => {
  const token = getToken()
  const postData = formatPostRecord(record)

  // console.log(postData)

  let response = await fetch(endpointUrl('records'), {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error("新增紀錄時出現錯誤")
    }
    return res.json()
  })
  .catch(error => { // 抓取其餘網路連接錯誤
    throw error
  })
  
  return response.data.documentId
}

const deleteRecord = async (documentId: string) => {
  const config = useRuntimeConfig()
  const token = config.public.strapiUserToken

  await fetch(endpointUrl(`records/${documentId}`), {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(res => {
    if (!res.ok || res.status !== 204) {
      throw new Error("Failed to delete record from strapi")
    }
    return true
  })
  .catch(error => { // 抓取其餘網路連接錯誤
    throw error
  })
}

// 成功的話，會回傳該紀錄於 strapi 的 documentId，後續看看如何使用（例如：更新 pinia 的紀錄。但是 pinia 應該已經一起編輯好了）
const updateRecord = async (documentId: string): Promise<string> => {
  const token = getToken()
  const { getRecordById } = useRecordsStore()
  const updateData = formatPostRecord(getRecordById(documentId)!)

  if (!updateData) {
    throw new Error("Record not found")
  }

  return await fetch(endpointUrl(`records/${documentId}`), {
    method: 'PUT',
    body: JSON.stringify(updateData),
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  })
  .then(res => {
    if (!res.ok || res.status !== 200) {
      throw new Error("Failed to update record in strapi")
    }
    return res.json().then(data => data.data.documentId)
  })
  .catch(error => {
    throw error // 抓取其餘網路連接錯誤
  })
}

// 成功的話回傳資料（含有 token）；失敗的話拋出狀態碼和錯誤
const login = async (data: LoginData) => {
  const config = useRuntimeConfig()
  const token = config.public.strapiTokenDev

  return await fetch(endpointUrl('auth/local'), {
    method: 'POST',
    body: JSON.stringify(data), // 這邊 strapi 是吃 identifier 和 password
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => {
    if (!res.ok) {
      const error = new Error(`登入失敗（${res.status}）`)
      error.cause = { status: res.status, statusText: res.statusText }
      throw error
    }
    return res.json()
  }).then( data => {
    setToken(data.jwt)
    return data
  })
  .catch(error => {
    if (error instanceof Error && error.cause) {
      throw error
    }
    else {
      throw new Error('網路連接異常')
    }
  })

  
}

const signup = async (data: SignupData) => {
  const config = useRuntimeConfig()
  const token = config.public.strapiTokenDev
  return await fetch(endpointUrl('auth/local/register'), {
    method: 'POST',
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
    }),
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(async res => {
    if (!res.ok) {
      const error = new Error(`註冊失敗（${res.status}）`)
      const errorData = await res.json()
      error.cause = { status: res.status, statusText: res.statusText }
      error.message = error.message + `：${errorData.error.message}`
      throw error
    }
    return res.json()
  })
  .catch(error => {
    if (error instanceof Error && error.cause) {
      throw error
    }
    else {
      throw new Error('網路連接異常')
    }
  })
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