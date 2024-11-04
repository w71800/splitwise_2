import { defineStore } from 'pinia'
import type { Record } from '@/types/types'
import { fakeRecords } from '@/data'
import { fetchRecordDatas } from '@/utils/api'


export const useRecordsStore = defineStore('records', {
  state: () => ({
    records: fakeRecords as Record[]
  }),
  actions: {
    setRecords(newRecords: Record[]) { // 載入紀錄s
      this.records = newRecords
    },
    addRecord(record: Record) { // 新增紀錄
      this.records.push(record)
      return record.id
    },
    deleteRecord(recordId: string) { // 刪除紀錄
      this.records = this.records.filter(record => record.id !== recordId)
    },
    putRecord(record: Record) {  // 替換紀錄
      const { id: targetId } = record
      this.records = this.records.map(r => r.id == targetId ? record : r)
      return targetId
    },
    async fetchRecords() {
      const recordDatas = await fetchRecordDatas()
      const formattedRecords = recordDatas.map(formatApiRecord)
    }
  },
  getters: {
    getRecordsByGroup: (state) => (groupId: string): Record[] => {
      return state.records.filter(record => record.group?.id === groupId)
    },
    getRecordsByFriend: (state) => (friendId: string): Record[] => {
      return state.records.filter(record => record.participants.some(participant => participant.id === friendId))
    },
    getRecordById: (state) => (recordId: string): Record | undefined => {
      return state.records.find(record => record.id === recordId)
    }
  }
})