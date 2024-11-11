import type { Record } from '@/types/types' 
import type { PostRecord } from '@/types/api'
import { formatPostRecord } from '@/utils/formatters'
import { useRecordsStore } from '@/store/records'

const endpointUrl = (resource: string, populates?: string[]) => {
  const config = useRuntimeConfig()
  const { strapiHost } = config.public
  return `${strapiHost}/api/${resource}${populates ? `?${populates.join('&')}` : ''}`
}

const fetchRecordDatas = () => {
  const config = useRuntimeConfig()

  const populateParams = [
    'populate[participants][populate][participant][populate][avatar][fields]=url',
    'populate[participants][populate]=tags',
    'populate[payers][populate][payer][populate][avatar][fields]=url',
    'populate[divisions][populate][participant][populate][avatar][fields]=url',
    'populate[group][populate][members][fields]=id, documentId, username, email',
    'populate[group][populate][members][populate][avatar][fields]=url'
  ]

  const endpoint = endpointUrl('records', populateParams)
  const token = config.public.strapiTokenDev

  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch records')
      }
      return res.json().then(data => data.data)
    })
    .catch((error) => {
      throw new Error(error.message)
    })
}

const fetchUserData = () => {
  const config = useRuntimeConfig()
  const token = useCookie('token').value || config.public.strapiUserToken

  const populateParams = [
    'populate[friends][populate]=*',
    'populate[groups][populate]=*',
    'populate[avatar][fields]=url',
    'populate[groups][populate][members][populate][avatar][fields]=url',
    'populate[groups][populate][avatar][fields]=url'
  ]

  const endpoint = endpointUrl('users/me', populateParams)

  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(error => {
    throw error
  })
}

// 成功的話，會回傳該紀錄於 strapi 的 documentId，後續用於路由
const postRecord = async (record: Record): Promise<string> => {
  const config = useRuntimeConfig()
  const token = config.public.strapiUserToken
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
  const config = useRuntimeConfig()
  const token = config.public.strapiUserToken
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

export {
  fetchRecordDatas,
  fetchUserData,
  postRecord,
  deleteRecord,
  updateRecord
}