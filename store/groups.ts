import { defineStore } from 'pinia'
import { fakeGroups } from '@/data'

export const useGroupsStore = defineStore('groups', {
  state: () => ({
    groups: fakeGroups
  })
})