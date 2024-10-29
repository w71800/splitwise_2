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
    divisionsMapper: initializeDivisionHistory(),
    currentSplitor: 'Equal'
  }),
  actions: {
    setRecord(record: Record | null = null) {
      this.record = record || createEmptyRecord()
    },
    saveDivisions() {
      this.record.divisions = this.divisionsMapper[this.currentSplitor.toLowerCase() as keyof typeof this.divisionsMapper]
      this.record.splitor = this.currentSplitor.toLowerCase() as 'equal' | 'fixed' | 'percentage' | 'ratio'
    },
    async loadDivisionsMapper(record: Record | null = null) {
      this.divisionsMapper = await initializeDivisionHistory(record)
    }
  }
})