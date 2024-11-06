import { defineStore } from 'pinia'
import type { User } from '@/types/types'
import { fakeUser } from '@/data'
import { fetchUserData } from '@/utils/api'

export const useUserDataStore = defineStore('userData', {
  state: (): User => fakeUser,
  actions: {
    async setUserData() {
      try {
        this.$state = this.dataFormatter(await fetchUserData())
        console.log(this.$state)
        return true 
      } catch (error) {
        console.error(error)
        return false
      }
    },
    dataFormatter(data: any): User {
      const runtimeConfig = useRuntimeConfig()
      const avatarUrl = runtimeConfig.public.strapiHost + data.avatar?.url
      return {
        id: data.documentId,
        displayName: data.username,
        email: data.email,
        avatar: avatarUrl,
        groups: data.groups,
        friends: data.friends.map((friend: any) => ({
          id: friend.documentId,
          displayName: friend.username,
          avatar: runtimeConfig.public.strapiHost + friend.avatar?.url
        }))
      }
    }
  }
})
