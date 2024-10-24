import { defineStore } from 'pinia'
import type { Record } from '@/types/types'
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

export const useEditorStore = defineStore('editor', {
  state: () => ({
    record: createEmptyRecord()
  }),
  actions: {
    setRecord(record: Record) {
      this.record = record
    }
  }
})