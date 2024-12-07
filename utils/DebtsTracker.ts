// const raw = [
//   {
//       "id": "kmi4kmbqwn8z46e33987ktjt",
//       "displayName": "潘威利",
//       "shouldPay": 0,
//       "debt": 4360,
//       "creditor": {
//           "id": "kmi4kmbqwn8z46e33987ktjt",
//           "displayName": "潘威利",
//           "paid": 4360
//       }
//   },
//   {
//       "id": "ufrj3k2kkeqi6u4qavv3gwwi",
//       "displayName": "李佩璇",
//       "shouldPay": 2180,
//       "debt": -2180,
//       "creditor": {
//           "id": "kmi4kmbqwn8z46e33987ktjt",
//           "displayName": "潘威利",
//           "paid": 4360
//       }
//   },
//   {
//       "id": "rovto4ii7b49wsi05xjvaive",
//       "displayName": "tester",
//       "shouldPay": 2180,
//       "debt": -2180,
//       "creditor": {
//           "id": "kmi4kmbqwn8z46e33987ktjt",
//           "displayName": "潘威利",
//           "paid": 4360
//       }
//   }
// ]
import type { Record } from '@/types/types'
import { getDebts } from './utils'


class DebtsTracker {
  debts: Map<string, number>
  debtorId: string

  constructor(debtorId: string, record: Record) {
    this.debtorId = debtorId
    this.debts = new Map()
    getDebts(record).forEach( item => {
      const { 
        creditor: { id: creditorId }, 
        debt: debtValue
      } = item
      this.addDebt(creditorId, debtValue)
    })
  }

  private addDebt(creditorId: string, debtValue: number) {
    this.debts.set(this.makeKey(creditorId), debtValue)
  }

  public getDebt(creditorId: string) {
    let key = this.makeKey(creditorId)
    return this.debts.get(key)
  }

  private makeKey(creditorId: string) {
    return `${this.debtorId}-${creditorId}`
  }
}

export default DebtsTracker