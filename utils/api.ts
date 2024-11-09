import type { Record } from '@/types/types' 
import type { PostRecord } from '@/types/api'
import { formatPostRecord } from '@/utils/formatters'

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

const postRecord = async (record: Record): Promise<string> => {
  const config = useRuntimeConfig()
  const token = config.public.strapiUserToken
  const postData = formatPostRecord(record)

  let response = await fetch(endpointUrl('records'), {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error("Failed to post record to strapi")
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

  let response = await fetch(endpointUrl(`records/${documentId}`), {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error("Failed to delete record from strapi")
    }
    return true
  })
  .catch(error => { // 抓取其餘網路連接錯誤
    throw error
  })
}

export {
  fetchRecordDatas,
  fetchUserData,
  postRecord,
  deleteRecord
}
