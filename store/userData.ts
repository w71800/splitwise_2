import { defineStore } from 'pinia'
import type { User } from '@/types/types'
import { fakeUser } from '@/data'
import { fetchUserData } from '@/utils/api'

export const useUserDataStore = defineStore('userData', {
  state: (): User => fakeUser,
  actions: {
    async loadUserData() {
      try {
        this.$state = this.dataFormatter(await fetchUserData())
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
        strapiId: data.id,
        displayName: data.displayName,
        email: data.email,
        avatar: avatarUrl,
        groups: data.groups.map((group: any) => ({
          id: group.documentId,
          strapiId: group.id,
          name: group.name,
          avatar: runtimeConfig.public.strapiHost + group.avatar?.url
        })),
        friends: data.friends.map((friend: any) => ({
          id: friend.documentId,
          strapiId: friend.id,
          displayName: friend.username,
          avatar: runtimeConfig.public.strapiHost + friend.avatar?.url
        }))
      }
    }
  }
})
