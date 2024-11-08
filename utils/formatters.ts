import type { Record, Participant, Payer, Division, Group } from '@/types/types'

interface ApiUser {
  id: number
  documentId: string
  email: string
  username: string
  avatar: string
}

interface ApiTag {
  documentId: string
  tag: string
}

interface ApiGroup {
  documentId: string
  name: string
  members: ApiUser[]
}

interface ApiPayer {
  documentId: string
  payer: ApiUser
  paid: number
}

interface ApiDivision {
  documentId: string
  participant: ApiUser
  value: number
}

interface ApiParticipant {
  documentId: string
  participant: ApiUser
  tags: ApiTag[]
}

interface ApiRecord {
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
  const payers: Payer[] = apiRecord.payers.map(p => ({
    id: p.payer.documentId,
    displayName: p.payer.username,
    paid: p.paid
  }))

  // 轉換分帳資料
  const divisions: Division[] = apiRecord.divisions.map(d => ({
    id: d.participant.documentId,
    displayName: d.participant.username,
    value: d.value
  }))

  const group: Group | null = apiRecord.group ? {
    id: apiRecord.group.documentId,
    name: apiRecord.group.name,
    members: apiRecord.group.members.map(m => ({
      id: m.documentId,
      displayName: m.username
    }))
  } : null

  return {
    id: apiRecord.documentId,
    title: apiRecord.title,
    fullDate: new Date(apiRecord.fullDate),
    value: apiRecord.value,
    currency: apiRecord.currency,
    splitor: apiRecord.splitor,
    group,
    participants,
    payers: payers[0],
    divisions
  }
}