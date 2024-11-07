const endpointUrl = (resource: string, populates: string[]) => {
  const config = useRuntimeConfig()
  const { strapiHost } = config.public
  return `${strapiHost}/api/${resource}?${populates.join('&')}`
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



export {
  fetchRecordDatas,
  fetchUserData
}
