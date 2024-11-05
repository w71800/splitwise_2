import { defineStore } from 'pinia'
import type { User } from '@/types/types'
import { fakeUser } from '@/data'

export const useUserDataStore = defineStore('userData', {
  state: (): User => ({
    id: '',
    displayName: '',
    email: '',
    avatar: ''
  }),
  actions: {
    async setUserData() {
      try {
        this.$state = this.dataFormatter(await this.fetchUserData())
      } catch (error) {
        console.error(error)
      }
    },
    async fetchUserData() {
      const runtimeConfig = useRuntimeConfig()
      const token = useCookie('token').value || runtimeConfig.public.strapiUserToken
      const endpoint = `http://localhost:1337/api/users/me?populate=*`
      return fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .catch(error => {
        throw error
      })
    },
    dataFormatter(data: any): User {
      const runtimeConfig = useRuntimeConfig()
      const avatarUrl = runtimeConfig.public.strapiHost + data.avatar.url
      return {
        id: data.documentId,
        displayName: data.username,
        email: data.email,
        avatar: avatarUrl,
        groups: data.groups,
        friends: data.friends
      }
    }
  }
})
