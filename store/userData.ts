import { defineStore } from 'pinia'
import type { User } from '@/types/types'
import { fakeUsers } from '@/data'

export const useUserDataStore = defineStore('userData', {
  state: (): User => fakeUsers,
})