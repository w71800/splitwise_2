/**
 * @todo
 * - 希望能夠把工具及撰寫的更加簡潔
 * - 要不要把 debt 的債務人資料包起來
 * - 將 getPartialSummary 的重複的邏輯整合在一起
 * - 摘要的內容值，跟個別 Record 的值總和對不起來。應該是因為 Record 所顯示的債務為在該項可以取回或欠款的數值，並非針對該朋友
 */

import type { Record, Division, Debt, Summary } from '@/types/types'


/**
 * 將數字或字符串轉換為兩位數的字符串，如果不足兩位則在前面補零。
 * @param {number | string} num - 要轉換的數字或字符串
 * @returns {string} 轉換後的兩位數字符串
 */
export const setPaddingZero = (num: number | string): string => {
  return num.toString().padStart(2, '0')
}

/**
 * 從月份字符串中獲取單個數字的月份。
 * 如果月份是單個數字，則直接返回；如果是兩位數，則返回第二個數字。
 * @param {string} month - 月份字符串
 * @returns {string} 單個數字的月份
 */
export const getSingleDigitMonth = (month : string): string => {
  if (month.length === 2 && month[0] === '0') { 
    return month.slice(1)
  } else {  
    return month
  }
}

/**
 * 包含不同分攤方式計算的工具函數集合
 */
export const splitors = {
  /**
   * 計算平均分攤的金額
   * @param {Record} record - 記錄對象
   * @returns {Array<{id: string, displayName: string, shouldPay: number}>} 每個參與者應付金額的數組
   */
  equal(record: Record): {
    id: string;
    displayName: string;
    shouldPay: number;
  }[] {
    const { divisions, value } = record
    const activeDivisions = divisions.filter(division => division.value > 0)
    const shouldPay = value / activeDivisions.length
    const debts = divisions.map(division => ({
      id: division.id,
      displayName: division.displayName,
      shouldPay: division.value > 0 ? shouldPay : 0
    }))
    
    return debts
  },
  /**
   * 計算固定金額分攤
   * @param {Record} record - 記錄對象
   * @returns {Array<{id: string, displayName: string, shouldPay: number}>} 每個參與者應付金額的數組
   */
  fixed(record: Record): {
    id: string;
    displayName: string;
    shouldPay: number;
  }[] {
    const { divisions } = record
    const debts = divisions.map(division => ({
      id: division.id,
      displayName: division.displayName,
      shouldPay: division.value
    }))
    
    return debts
  },
  /**
   * 計算百分比分攤的金額
   * @param {Record} record - 記錄對象
   * @returns {Array<{id: string, displayName: string, shouldPay: number}>} 每個參與者應付金額的數組
   */
  percentage(record: Record): {
    id: string;
    displayName: string;
    shouldPay: number;
  }[] {
    const { divisions, value } = record
    const debts = divisions.map(division => ({
      id: division.id,
      displayName: division.displayName,
      shouldPay: value * (division.value / 100)
    }))
    
    return debts
  },
  /**
   * 計算比例分攤的金額
   * @param {Record} record - 記錄對象
   * @returns {Array<{id: string, displayName: string, shouldPay: number}>} 每個參與者應付金額的數組
   */
  ratio(record: Record): {
    id: string;
    displayName: string;
    shouldPay: number;
  }[] {
    const { divisions, value } = record
    const totalRatio = divisions.reduce((sum, division) => sum + division.value, 0)
    const debts = divisions.map(division => ({
      id: division.id,
      displayName: division.displayName,
      shouldPay: value * (division.value / totalRatio)
    }))
    
    return debts
  }
}

/**
 * 根據條件物件過濾記錄
 * @param {string} id - 用戶ID
 * @returns {Record[]} 過濾後的記錄數組
 */
interface Filter {
  id?: string
  tags?: string[]
}
export const filterRecords = (records: Record[], conditions: Filter): Record[] => {
  let { id, tags } = conditions

  if(id) {
    return records.filter(record => record.id === id)
  }
  if(tags && tags.length > 0) {
    return records.filter(record => {
      const { participants } = record
      return participants.some(p => 
        p.tags && p.tags.some(tag => tags.includes(tag))
      )
    })
  }
  return records // 如果沒有條件，返回所有記錄
}

/**
 * 計算記錄中的債務情況
 * @param {Record} record - 記錄對象
 * @param {string} [userId] - 可選的用戶ID，用於過濾特定用戶的債務
 * @returns {Debt[]} 債務數組
 */
export const getDebts = (record: Record, userId?: string): Debt[] => {
  let debts: Debt[] = []
  const { participants, payers, value, splitor } = record
  // 1. 計算每個參與者應付的金額
  // 2. 計算每個參與者實際支付的金額
  // 3. 計算每個參與者應付金額與實際支付金額的差額
  // 4. 找出債權人（付款超過應付金額的人）
  // 5. 分配債務給債權人已記帳

  
  // 先計算每一個參與者的應付金額
  const owes: {
    id: string;
    displayName: string;
    shouldPay: number;
  }[] = splitors[splitor](record)

  // 計算每一個參與者的債務
  debts = owes.map(owe => {
    
    let debt = owe.id === payers.id
      ? payers.paid - owe.shouldPay
      : -1 * owe.shouldPay
    
    return {
      ...owe,
      debt,
      creditor: {
        id: payers.id,
        displayName: payers.displayName,
        paid: payers.paid
      }
    }
  })

  if (userId) {
    debts = debts.filter(debt => debt.id === userId)
  }
  // TODO: 不太懂為什麼是這樣排序，他會是用怎麼樣的模式進行比對的呢？
  debts.sort((a, b) => {
    if (a.id === a.creditor.id) return -1
    if (b.id === b.creditor.id) return 1
    return 0
  })
  console.log(debts);
  return debts
}

// 從現有的 records 中選出 5 個
export const getTags = (records: Record[], userId: string): string[] => {
  let resultTags: string[] = []
  outerLoop: for(let record of records) {
    const user = record.participants.filter(p => p.id === userId)[0]
    const { tags: recordTags } = user
    
    if(!recordTags) continue
    for(let tag of recordTags) {
      if(resultTags.length >= 6) break outerLoop;
      
      if(!resultTags.includes(tag)) {
        resultTags.push(tag)
      }
    }
  }

  return resultTags
}


export const getSummary = (records: Record[], userId: string): Summary => {
  const debts = records.map(record => getDebts(record)).flat()
  const totalSummary = getTotalSummary(debts, userId)
  const partialSummary = getPartialSummary(debts, userId)

  return {
    total: totalSummary,
    partial: partialSummary
  }
}


function getTotalSummary(debts: Debt[], userId: string): {
  id: string,
  displayName: string, 
  status: DebtStatus, 
  value: number
}[]{
  const temp = debts.reduce((acc, debt) => {
    const { displayName, debt: debtValue, id } = debt
    const isExist = acc.find(item => item.displayName === displayName)
    if (isExist) {
      isExist.value += debtValue
    } else {
      acc.push({
        id: id,
        displayName,
        value: debtValue
      })
    }
    return acc
  }, [] as { id: string, displayName: string, value: number }[])

  const summary = temp.map(obj => {
    let status: DebtStatus

    if (obj.value > 0) {
      status = DebtStatus.Receivable
    } else if (obj.value < 0) {
      status = DebtStatus.Payable
    } else {
      status = DebtStatus.Settled
    }
    return { ...obj, status }
  })
  
  return summary
}

function getPartialSummary(debts: Debt[], userId: string): {
  id: string
  displayName: string
  status: DebtStatus
  value: number
}[]{
  let summary: {
    id: string
    displayName: string
    value: number
  }[] = []
  
  // 使用者為 creditor 的 debts
  const creditorDebts = debts.filter(debt => debt.creditor.id === userId && debt.id !== userId)
  creditorDebts.forEach(debt => {
    const { displayName, debt: debtValue, id } = debt
    
    const isExist = summary.find(item => item.displayName === displayName)
    if(isExist) {
      isExist.value += (-1 * debtValue)
    } else {
      summary.push({
        id,
        displayName,
        value: (-1 * debtValue)
      })
    }
  })
  // 使用者為 debtor 的 debts
  const debtorDebts = debts.filter(debt => debt.id === userId && debt.creditor.id !== userId)
  debtorDebts.forEach(debt => {
    const { displayName, debt: debtValue, id, creditor } = debt
    const isExist = summary.find(item => item.displayName === creditor.displayName)
    if(isExist) {
      isExist.value += debtValue
    } else {
      summary.push({
        id,
        displayName,
        value: debtValue
      })
    }
  })

  const partialSummary = summary.map(obj => {
    let status: DebtStatus

    if (obj.value > 0) {
      status = DebtStatus.Receivable
    } else if (obj.value < 0) {
      status = DebtStatus.Payable
    } else {
      status = DebtStatus.Settled
    }

    return { ...obj, status }
  })

  return partialSummary
}

export function getComplement(source: any[], target: any[]): any[] {
  return source.filter(item => !target?.some(t => t.id === item.id))
}

export enum DebtStatus {
  Receivable = '可回收',
  Payable = '應支付',
  Settled = '無欠款'
}

export const splitorList = [
  {
    name: 'Equal',
    icon: '/icons/equal.png',
    iconActive: '/icons/equal_active.png'
  },
  {
    name: 'Fixed',
    icon: '/icons/fixed.png',
    iconActive: '/icons/fixed_active.png'
  },
  {
    name: 'Ratio',
    icon: '/icons/ratio.png',
    iconActive: '/icons/ratio_active.png'
  },
  {
    name: 'Percentage',
    icon: '/icons/percent.png',
    iconActive: '/icons/percent_active.png'
  }
]