import { defineStore } from 'pinia'
import type { Record } from '@/types/types'
import { fakeRecords } from '@/data'


export const useRecordsStore = defineStore('records', {
  state: () => ({
    records: fakeRecords as Record[]
  }),
  actions: {
    setRecords(newRecords: Record[]) {
      this.records = newRecords
    }
  },
  getters: {
    getRecordsByGroup: (state) => (groupId: string): Record[] => {
      return state.records.filter(record => record.group?.id === groupId)
    },
    getRecordsByFriend: (state) => (friendId: string): Record[] => {
      return state.records.filter(record => record.participants.some(participant => participant.id === friendId))
    }
  }
})