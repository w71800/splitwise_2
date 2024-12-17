import { defineStore } from 'pinia'
import type { Record } from '@/types/types'
import * as api from '@/utils/api'
import DebtsTracker from '@/utils/DebtsTracker'
import { useUserDataStore } from './userData'

export const useRecordsStore = defineStore('records', {
  state: () => ({
    records: [] as Record[],
    isLoading: false,
    error: null
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
    updateRecord(record: Record) {  // 替換紀錄
      const { id: targetId } = record
      this.records = this.records.map(r => r.id == targetId ? record : r)
      return targetId
    },
    clearRecords() {
      this.$reset()
    },
    async loadRecords() {
      try {
        const recordDatas = await api.fetchRecords()
        console.log(recordDatas);
        const formattedRecords = recordDatas.map(formatApiRecord)
        this.setRecords(formattedRecords)
      } catch (error) {
        console.error(error)
      }
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
    },
    createDebtTracker: (state) => (recordId: string): DebtsTracker => {
      const record = state.records.find(record => record.id === recordId)
      const userDataStore = useUserDataStore()
      const { id: userId } = storeToRefs(userDataStore)
      
      if (!record) throw new Error('Record not found')
      return new DebtsTracker(userId.value, record)
    }
  }
})