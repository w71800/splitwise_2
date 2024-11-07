export const fetchRecordDatas = () => {
  const config = useRuntimeConfig()
  const { strapiHost } = config.public

  const populateParams = [
    'populate[participants][populate][participant][populate][avatar][fields]=url',
    'populate[participants][populate]=tags',
    'populate[payers][populate][payer][populate][avatar][fields]=url',
    'populate[divisions][populate][participant][populate][avatar][fields]=url',
    'populate[group][populate][members][fields]=id, documentId, username, email',
    'populate[group][populate][members][populate][avatar][fields]=url'
  ].join('&')

  const endpoint = `${strapiHost}/api/records?${populateParams}`

  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${config.public.strapiTokenDev}`
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

export const fetchUserData = () => {
  const config = useRuntimeConfig()
  const { strapiHost } = config.public
  const token = useCookie('token').value || config.public.strapiUserToken

  const populateParams = [
    'populate[friends][populate]=*',
    'populate[groups][populate]=*',
    'populate[avatar][fields]=url',
    'populate[groups][populate][members][populate][avatar][fields]=url',
    'populate[groups][populate][avatar][fields]=url'
  ].join('&')

  const endpoint = `${strapiHost}/api/users/me?${populateParams}`

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