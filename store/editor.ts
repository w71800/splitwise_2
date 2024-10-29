import { defineStore } from 'pinia'
import type { Record, Division } from '@/types/types'
import { useUserDataStore } from '@/store/userData'
import { v4 as uuidv4 } from 'uuid'


const createEmptyRecord = (): Record => {
  const userDataStore = useUserDataStore()
  const userData = { 
    id: userDataStore.id,
    displayName: userDataStore.displayName,
    email: userDataStore.email,
    avatar: userDataStore.avatar
  }


  return {
    id: uuidv4(),
    title: '',
    value: 0,
    currency: 'TWD',
    fullDate: new Date(),
    participants: [ userData ],
    divisions: [ { ...userData, value: 0 } ],
    payers: { ...userData, paid: 0 },
    splitor: 'equal',
    group: null
  }
}

const initializeDivisionHistory = (record: Record | null = null) => {
  const userDataStore = useUserDataStore()
  const userData = { 
    id: userDataStore.id,
    displayName: userDataStore.displayName,
    email: userDataStore.email,
    avatar: userDataStore.avatar
  }

  switch (record?.splitor) {
    case 'equal':
      return {
        equal: record.divisions,
        fixed: [ { ...userData, value: 0 } ],
        percentage: [ { ...userData, value: 0 } ],
        ratio: [ { ...userData, value: 0 } ]
      }

    case 'fixed':
      return {
        equal: [ { ...userData, value: 0 } ],
        fixed: record.divisions,
        percentage: [ { ...userData, value: 0 } ],
        ratio: [ { ...userData, value: 0 } ]
      }

    case 'percentage':
      return {
        equal: [ { ...userData, value: 0 } ],
        fixed: [ { ...userData, value: 0 } ],
        percentage: record.divisions,
        ratio: [ { ...userData, value: 0 } ]
      } 

    case 'ratio':
      return {
        equal: [ { ...userData, value: 0 } ],
        fixed: [ { ...userData, value: 0 } ],
        percentage: [ { ...userData, value: 0 } ],
        ratio: record.divisions
      }

    default:
      return {
        equal: [ { ...userData, value: 0 } ],
        fixed: [ { ...userData, value: 0 } ],
        percentage: [ { ...userData, value: 0 } ],
        ratio: [ { ...userData, value: 0 } ]
      }
  }
}

export const useEditorStore = defineStore('editor', {
  state: () => ({
    record: createEmptyRecord(),
    divisionsMapper: initializeDivisionHistory()
  }),
  actions: {
    setRecord(record: Record) {
      this.record = record
    },
    saveDivisions() { // 抓到該紀錄的 splitor 所對應的 divisions，並將 division 加入該 array
      this.record.divisions = this.divisionsMapper[this.record.splitor]
    },
    async loadDivisionsMapper() {
      this.divisionsMapper = await initializeDivisionHistory(this.record)
    }
  }
})