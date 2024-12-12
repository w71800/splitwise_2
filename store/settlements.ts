import { defineStore } from 'pinia'
import type { Settlement } from '@/types/types'
import { useUserDataStore } from '@/store/userData'
import type { Record } from '@/types/types.js'



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
  const { id: userId, displayName: userDisplayName, strapiId: userStrapiId } = storeToRefs(useUserDataStore())
  return {
    creator: {
      id: userId.value,
      strapiId: userStrapiId.value,
      displayName: userDisplayName.value
    },
    debtor: {
      id: debtorId,
      strapiId: userStrapiId.value,
      displayName: userDisplayName.value
    },
    creditor: {
      id: creditorId,
      strapiId: getFriendById(creditorId)?.strapiId || 0, // NOTE: 這邊的 0 可能會出錯
      displayName: getFriendById(creditorId)?.displayName || '未知'
    },
    value,
    currency: 'TWD'
  }
}

export const transformSettlement = (settlement: Settlement): Omit<Record, 'id'> => {
  const { creditor, debtor } = settlement
  const { value: settlementValue, currency } = settlement
  return {
    title: `結清 ${settlementValue} ${currency}`,
    value: settlement.value,
    currency: settlement.currency,
    fullDate: new Date(),
    participants: [ creditor, debtor ],
    divisions: [ { ...creditor, value: 0 }, { ...debtor, value: settlementValue } ],
    payers: { ...debtor, paid: settlementValue },
    splitor: 'fixed',
    group: null,
    isSettlement: true
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