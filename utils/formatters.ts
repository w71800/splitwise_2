import type { Record, User, Participant, Payer, Division } from '@/types/types'

interface ApiUser {
  id: number
  documentId: string
  email: string
  username: string
}

interface ApiTag {
  id: number
  tag: string
}

interface ApiRecord {
  id: number
  documentId: string
  title: string
  group: {
    id: string
    name: string,
    members: ApiUser[]
  } | null
  createdAt: string
  updatedAt: string
  publishedAt: string
  splitor: 'equal' | 'fixed' | 'percentage' | 'ratio'
  value: number
  currency: 'TWD' | 'USD' | 'JPY'
  payers: Array<{
    id: number
    paid: number
    payer: ApiUser[]
  }>
  participants: Array<{
    id: number
    participant: ApiUser
    tags: ApiTag[]
  }>
  divisions: Array<{
    id: number
    participant: ApiUser
    value: number
  }>
}

export function formatApiRecord(apiRecord: ApiRecord): Record {
  // 轉換參與者資料
  const participants: Participant[] = apiRecord.participants.map(p => ({
    id: p.participant.documentId,
    email: p.participant.email,
    displayName: p.participant.username,
    tags: p.tags.map(t => t.tag)
  }))

  // 轉換付款者資料
  const payers = apiRecord.payers.map(p => ({
    id: p.payer[0].documentId,
    displayName: p.payer[0].username,
    paid: p.paid
  }))[0]

  // 轉換分帳資料
  const divisions = apiRecord.divisions.map(d => ({
    id: d.participant.documentId,
    displayName: d.participant.username,
    value: d.value
  }))

  return {
    id: apiRecord.documentId,
    title: apiRecord.title,
    fullDate: new Date(apiRecord.createdAt),
    group: apiRecord.group ? {
      id: apiRecord.group.id,
      name: apiRecord.group.name,
      members: apiRecord.group.members.map(m => ({
        id: m.documentId,
        displayName: m.username
      }))
    } : null,
    value: apiRecord.value,
    currency: apiRecord.currency,
    splitor: apiRecord.splitor,
    participants,
    payers,
    divisions
  }
}