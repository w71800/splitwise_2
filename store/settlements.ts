import { defineStore } from 'pinia'
import type { Settlement } from '@/types/types'
import { useUserDataStore } from '@/store/userData'



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

export const createSettlement = (debtorId: string, creditorId: string, value: number = 0): Settlement => {
  const { getFriendById } = useUserDataStore()
const { id: userId, displayName: userDisplayName } = storeToRefs(useUserDataStore())
  return {
    creator: {
      id: userId.value,
      displayName: userDisplayName.value
    },
    debtor: {
      id: debtorId,
      displayName: userDisplayName.value
    },
    creditor: {
      id: creditorId,
      displayName: getFriendById(creditorId)?.displayName || '未知'
    },
    value,
    currency: 'NTD'
  }
}


export const useSettlementsStore = defineStore('settlements', {
  state: () => ({
    settlements: [] as Settlement[],
    isShow: false
  }),
  getters: {
    getSettlements: (state) => state.settlements
  },
  actions: {
    addSettlement(settlement: Settlement) {
      this.settlements.push(settlement)
    },
    toggleSettlementEditor() {
      if (this.isShow) {
        this.settlements = []
      }
      this.isShow = !this.isShow
    },

  }
})