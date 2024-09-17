export const getRecords = (source: 'groups' | 'friends', id: string | number) => {
  return fetch(`/api/records?source=${source}&id=${id}`)
    .then( (res) => {
      if(!res.ok) {
        throw new Error('Failed to fetch records')
      }
      return res.json()
    })
    .catch( (error) => {
throw new Error(error.message)
    })
}