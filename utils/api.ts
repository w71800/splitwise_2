// export const fetchRecords = (source: 'groups' | 'friends', id: string | number) => {
//   return fetch(`/api/records?source=${source}&id=${id}`)
//     .then( (res) => {
//       if(!res.ok) {
//         throw new Error('Failed to fetch records')
//       }
//       return res.json()
//     })
//     .catch( (error) => {
//       throw new Error(error.message)
//     })
// }

const url = 'http://localhost:1337/api/records?populate[payers][populate][payer][fields]=id,documentId,email,username&populate[participants][populate][participant][fields]=id,documentId,email,username&populate[participants][populate]=tags&populate[divisions][populate][participant][fields]=id,documentId,email,username'
export const fetchRecordDatas = () => {
  const config = useRuntimeConfig()

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${config.public.strapiTokenDev}`
    }
  })
    .then( (res) => {
      if(!res.ok) {
        throw new Error('Failed to fetch records')
      }
      return res.json().then(data => data.data)
    })
    .catch( (error) => {
      throw new Error(error.message)
    })
}

export const fetchUserData = () => {
  const runtimeConfig = useRuntimeConfig()
  
  const token = useCookie('token').value || runtimeConfig.public.strapiUserToken
  const endpoint = `http://localhost:1337/api/users/me?populate[friends][populate]=*&populate[groups][populate]=*&populate[avatar][fields]=url`
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