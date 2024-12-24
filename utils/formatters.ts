import type { Record, Participant, Payer, Division, Group } from '@/types/types'
import type { PostRecord } from '@/types/api'

interface ApiUser {
  id: number
  documentId: string
  email: string
  username: string
  avatar: { url: string } | null
}

interface ApiTag {
  documentId: string
  tag: string
}

interface ApiGroup {
  id: number
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
  divisions: ApiDivision[],
  isSettlement?: boolean | null
}

export function formatApiRecord(apiRecord: ApiRecord): Record {
  const runtimeConfig = useRuntimeConfig()
  const { strapiHost } = runtimeConfig.public

  // 轉換參與者資料
  const participants: Participant[] = apiRecord.participants.map((p: ApiParticipant) => ({
    id: p.participant.documentId,
    strapiId: p.participant.id,
    email: p.participant.email,
    displayName: p.participant.username,
    tags: p.tags.map(t => t.tag),
    avatar: p.participant.avatar && new URL(p.participant.avatar.url, strapiHost).toString()
  }))

  // 轉換付款者資料
  const payers: Pick<Payer, 'id' | 'strapiId' | 'displayName' | 'paid' | 'avatar'>[] = apiRecord.payers.map((p: ApiPayer) => ({
    id: p.payer.documentId,
    strapiId: p.payer.id,
    displayName: p.payer.username,
    paid: p.paid,
    avatar: p.payer.avatar && new URL(p.payer.avatar.url, strapiHost).toString()
  }))

  // 轉換分帳資料
  const divisions: Division[] = apiRecord.divisions.map((d: ApiDivision) => ({
    id: d.participant.documentId,
    strapiId: d.participant.id,
    displayName: d.participant.username,
    avatar: d.participant.avatar && new URL(d.participant.avatar.url, strapiHost).toString(),
    value: d.value
  }))

  const group: Group | null = apiRecord.group ? {
    id: apiRecord.group.documentId,
    strapiId: apiRecord.group.id,
    name: apiRecord.group.name,
    members: apiRecord.group.members.map((m: ApiUser) => ({
      id: m.documentId,
      strapiId: m.id,
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
    divisions,
    isSettlement: apiRecord.isSettlement ?? false
  }
}

export function formatPostRecord(record: Omit<Record, 'id'>): { data: PostRecord } {
  const schema = {
    title: record.title,
    splitor: record.splitor,
    value: record.value,
    currency: record.currency as 'TWD' | 'USD' | 'JPY',
    fullDate: record.fullDate.toISOString(),
    participants: record.participants.map(p => ({
      participant: { id: p.strapiId },
      tags: p.tags ? p.tags.map(t => ({ tag: t })) : []
    })),
    payers: [{
      payer: { id: record.payers.strapiId },
      paid: record.payers.paid
    }],
    divisions: record.divisions.map(d => ({
      participant: { id: d.strapiId },
      value: d.value
    })),
    group: record.group ? { id: record.group.strapiId } : null,
    isSettlement: record.isSettlement
  }
  return { data: schema }
}