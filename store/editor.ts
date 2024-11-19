import { defineStore } from 'pinia'
import type { Record, Division } from '@/types/types'
import { useUserDataStore } from '@/store/userData'
import { v4 as uuidv4 } from 'uuid'


const createEmptyRecord = (): Record => {
  const userDataStore = useUserDataStore()
  const userData = userDataStore.$state


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
  const userData = userDataStore.$state

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
    record: createEmptyRecord() as Record,
    divisionsMapper: initializeDivisionHistory(),
    currentSplitor: 'Equal',
    editorMode: 'add',
    isInitialized: false,
    isEditorShowing: false,
    isEditorScrolled: false
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
      try {
        this.divisionsMapper = await initializeDivisionHistory(record)
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
    async initializeEditor() {
      const userDataStore = useUserDataStore()
      
      await userDataStore.setUserData()
      await this.loadDivisionsMapper()
      this.setRecord()
      
      this.isInitialized = true
    },
    openEditor(record: Record | null = null) {
      this.record = record || createEmptyRecord()
      this.isEditorShowing = true
    }
  }
})