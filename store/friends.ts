import { defineStore } from 'pinia'
import { fakeFriends } from '@/data'

export const useFriendsStore = defineStore('friends', {
  state: () => ({
    friends: fakeFriends
  })
})