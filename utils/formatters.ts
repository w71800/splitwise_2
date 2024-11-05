import type { Record, User, Participant, Payer, Division } from '@/types/types'

interface ApiUser {
  id: number
  documentId: string
  email: string
  username: string
  avatar: string
}

interface ApiTag {
  id: number
  tag: string
}

interface ApiGroup {
  id: string
  name: string
  members: ApiUser[]
}

interface ApiPayer {
  id: number
  payer: ApiUser
  paid: number
}

interface ApiDivision {
  id: number
  participant: ApiUser
  value: number
}

interface ApiParticipant {
  id: number
  participant: ApiUser
  tags: ApiTag[]
}

interface ApiRecord {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  fullDate: string
  title: string
  group: ApiGroup | null
  participants: ApiParticipant[]
  splitor: 'equal' | 'fixed' | 'percentage' | 'ratio'
  value: number
  currency: 'TWD' | 'USD' | 'JPY'
  payers: ApiPayer[]
  divisions: ApiDivision[]
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
    id: p.payer.documentId,
    displayName: p.payer.username,
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
    fullDate: new Date(apiRecord.fullDate),
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