import { defineStore } from 'pinia'
import type { User } from '@/types/types'
import { fakeUser } from '@/data'

export const useUserDataStore = defineStore('userData', {
  state: (): User => fakeUser,
})