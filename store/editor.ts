import { defineStore } from 'pinia'
import type { Record, Division } from '@/types/types'
import { useUserDataStore } from '@/store/userData'
import { v4 as uuidv4 } from 'uuid'

interface DivisionMapper {
  equal: Division[];
  fixed: Division[];
  percentage: Division[];
  ratio: Division[];
}

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

// 根據 record 內的 divisions 初始化 divisionMapper。其餘都設置成 value 為 0 的 Division
const initializeDivisionMapper = (record: Record | null = null): DivisionMapper => {
  const userDataStore = useUserDataStore()
  const userData = userDataStore.$state
  const emptyDivisions = record?.divisions.map(division => ({ ...division, value: 0 })) || []
  const splitors = [ 'equal', 'fixed', 'percentage', 'ratio' ]
  
  // 根據有的 splitors 生成 divisionMapper
  const generateDivisionMapper = (splitor: string | null) => {
    return splitors.reduce((acc, curr) => {
      acc[curr] = curr === splitor ? record.divisions : emptyDivisions
      return acc
    }, {})
  }
  switch (record?.splitor) {
    case 'equal':
      return generateDivisionMapper('equal')

    case 'fixed':
      return generateDivisionMapper('fixed')

    case 'percentage':
      return generateDivisionMapper('percentage')

    case 'ratio':
      return generateDivisionMapper('ratio')

    default:
      return generateDivisionMapper(null)
  }
}

export const useEditorStore = defineStore('editor', {
  state: () => ({
    record: createEmptyRecord() as Record,
    divisionsMapper: initializeDivisionMapper(),
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
      this.record.divisions = this.divisionsMapper[this.currentSplitor.toLowerCase() as keyof DivisionMapper]
      this.record.splitor = this.currentSplitor.toLowerCase() as 'equal' | 'fixed' | 'percentage' | 'ratio'
    },
    async loadDivisionsMapper(record: Record | null = null) {
      try {
        this.divisionsMapper = await initializeDivisionMapper(record)
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
    async initializeEditor() {
      const userDataStore = useUserDataStore()
      
      await userDataStore.loadUserData()
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