/*
  @todo:
  - 目前是 user 的資料各個屬性分散為不同的 state。我不太喜歡這樣，想要直接回傳的是一個固定的 userData state。
*/

import { defineStore } from 'pinia'
import type { User } from '@/types/types'
import { fakeUser } from '@/data'

export const useUserDataStore = defineStore('userData', {
  state: (): User => fakeUser,
})