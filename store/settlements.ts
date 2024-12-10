import { defineStore } from 'pinia'
import type { Settlement } from '@/types/types'
const fakeSettlements = [
  {
    creator: {
      id: "kmi4kmbqwn8z46e33987ktjt",
      displayName: "潘威利"
    },
    debtor: {
      id: 'kmi4kmbqwn8z46e33987ktjt',
      displayName: '潘威利'
    },
    creditor: {
      id: '',
      displayName: '李佩璇'
    },
    value: 100,
    currency: 'NTD'
  }
]


export const useSettlementsStore = defineStore('settlements', {
  state: () => ({
    settlements: [] as Settlement[]
  }),
  getters: {
    getSettlements: (state) => state.settlements
  },
  actions: {
    addSettlement(settlement: Settlement) {
      this.settlements.push(settlement)
    }

  }
})