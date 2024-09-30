/*
  @todo:
  - 在沒有回傳一整包物件的狀況，要如何抓到這個 User 資料？
*/

import { defineStore } from 'pinia'
import type { User } from '@/types/types'
import { fakeUser } from '@/data'

export const useUserDataStore = defineStore('userData', {
  state: (): User => fakeUser,
})