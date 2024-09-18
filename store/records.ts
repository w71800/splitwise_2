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
  }
})