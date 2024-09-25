import { defineStore } from 'pinia'
import { fakeGroups } from '@/data'

export const useGroupsStore = defineStore('groups', {
  state: () => ({
    groups: fakeGroups
  }),
  getters: {
    getGroupById: (state) => (groupId: string) => {
      return state.groups.find(group => group.id === groupId)
    }
  }
})