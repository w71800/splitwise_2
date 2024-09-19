/**
 * @todo
 * - 希望能夠把工具及撰寫的更加簡潔
 */

import type { Record, Division, Debt } from '@/types/types'

export const setPaddingZero = (num: number | string): string => {
  return num.toString().padStart(2, '0')
}

export const getSingleDigitMonth = (month : string): string => {
  if (month.length === 1) { 
    return month
  } else {  
    return month.slice(1)
  }
}

// 取得每個 division 來計算每個參與者應付的金額的工具函數集
export const splitors = {
  equal(record: Record): {
    id: string;
    displayName: string;
    shouldPay: number;
  }[] {
    const { divisions, value } = record
    const shouldPay = value / divisions.length
    const debts: {
      id: string;
      displayName: string;
      shouldPay: number;
    }[] = divisions.map(division => ({
      id: division.id,
      displayName: division.displayName,
      shouldPay
    }))
    
    return debts
  },
  fixed(record: Record): {
    id: string;
    displayName: string;
    shouldPay: number;
  }[] {
    const { divisions } = record
    const debts: {
      id: string;
      displayName: string;
      shouldPay: number;
    }[] = divisions.map(division => ({
      id: division.id,
      displayName: division.displayName,
      shouldPay: division.value
    }))
    
    return debts
  },
  percentage(record: Record): {
    id: string;
    displayName: string;
    shouldPay: number;
  }[] {
    const { divisions, value } = record
    const debts: {
      id: string;
      displayName: string;
      shouldPay: number;
    }[] = divisions.map(division => ({
      id: division.id,
      displayName: division.displayName,
      shouldPay: value * (division.value / 100)
    }))
    
    return debts
  },
  ratio(record: Record): {
    id: string;
    displayName: string;
    shouldPay: number;
  }[] {
    const { divisions, value } = record
    const totalRatio = divisions.reduce((sum, division) => sum + division.value, 0)
    const debts: {
      id: string;
      displayName: string;
      shouldPay: number;
    }[] = divisions.map(division => ({
      id: division.id,
      displayName: division.displayName,
      shouldPay: value * (division.value / totalRatio)
    }))
    
    return debts
  }
}

export const filterRecords = (id: string): Record[] => {
  return []
}

export const getDebts = (record: Record, userId?: string): Debt[] => {
  let debts: Debt[] = []
  const { participants, payers, value, splitor } = record
  // 1. 計算每個參與者應付的金額
  // 2. 計算每個參與者實際支付的金額
  // 3. 計算每個參與者應付金額與實際支付金額的差額
  // 4. 找出債權人（付款超過應付金額的人）
  // 5. 分配債務給債權人

  const owes: {
    id: string;
    displayName: string;
    shouldPay: number;
  }[] = splitors[splitor](record)

  debts = owes.map(owe => ({
    id: owe.id,
    displayName: owe.displayName,
    shouldPay: owe.shouldPay,
    debt: owe.shouldPay - payers.paid || 0,
    creditorId: null
  }))

  if (userId) {
    debts = debts.filter(debt => debt.id === userId)
  }

  return debts
}