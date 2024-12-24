import { defineStore } from 'pinia'
import type { User } from '@/types/types'
import { fakeUser } from '@/data'
import { fetchUserData } from '@/utils/api'

export const useUserDataStore = defineStore('userData', {
  state: (): User => fakeUser, // userData 的各項屬性，變為整個 state 的分項
  getters: {
    getFriendById: (state: User) => (id: string) => state.friends?.find(friend => friend.id === id) || null
  },
  actions: {
    async loadUserData() {
      console.log('loadUserData')
      try {
        this.$state = this.dataFormatter(await fetchUserData())
      } catch (error) {
        throw error
      }
    },
    dataFormatter(data: any): User {
      const runtimeConfig = useRuntimeConfig()
      const avatarUrl = data.avatar && new URL(data.avatar.url, runtimeConfig.public.strapiHost).toString()
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
    },
    clearUserData() {
      this.$reset()
    }
  }
})
