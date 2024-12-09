import type { Record } from '@/types/types'
import { getDebts } from './utils'


class DebtsTracker {
  debts: Map<string, number>
  userId: string

  constructor(userId: string, record: Record) {
    this.userId = userId
    this.debts = new Map()
    getDebts(record).forEach( item => {
      const { 
        creditor: { id: creditorId },
        id: debtorId,
        debt: debtValue
      } = item
      if (debtorId !== creditorId) {
        this.addDebt(debtorId, creditorId, debtValue) // 如果是我付款的，debtor 是對方、creditor 是我；但如果是對方付款 debtor 是我、creditor 是對方
      }
    })
  }

  private addDebt(debtorId: string, creditorId: string, debtValue: number) {
    this.debts.set(this.makeKey(debtorId, creditorId), debtValue)
  }

  public getDebt(debtorId: string, creditorId: string) {
    let key = this.makeKey(debtorId, creditorId)
    return this.debts.get(key) || 0
  }

  private makeKey(debtorId: string, creditorId: string) {
    return `${debtorId}-${creditorId}`
  }
  // 取得使用者對某人的債務總和，正值為可回收、負值為欠款
  public getBalance(subjectId: string) {
    const shouldGet = -1 * this.getDebt(subjectId, this.userId)
    const shouldPay = this.getDebt(this.userId, subjectId)
    return shouldGet + shouldPay
  }
}

export default DebtsTracker