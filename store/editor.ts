import { defineStore } from 'pinia'
import type { Record, Participant, Division, Payer } from '@/types/types'

export const useEditorStore = defineStore('editor', {
  state: () => ({
    record: {} as Record
  }),
  actions: {
    setRecord(record: Record) {
      this.record = record
    }
  }
})

// id: 'rec123456',
//       title: '週末聚餐',
//       value: 1200,
//       currency: 'TWD',
//       fullDate: '2023-04-15',
//       participants: [
//         {
//           id: 'user1',
//           displayName: '小明',
//           tags: ['朋友']
//         },
//         {
//           id: 'user2',
//           displayName: '小華',
//           tags: ['同事']
//         },
//         {
//           id: 'user3',
//           displayName: '小李',
//           tags: ['家人']
//         }
//       ] as Participant[],
//       divisions: [
//         {
//           id: 'user1',
//           displayName: '小明',
//           value: 400
//         },
//         {
//           id: 'user2',
//           displayName: '小華',
//           value: 400
//         },
//         {
//           id: 'user3',
//           displayName: '小李',
//           value: 400
//         }
//       ] as Division[],
//       payers: {
//         id: 'user1',
//         displayName: '小明',
//         paid: 1200
//       } as Payer,
//       splitor: 'equal',
//       group: {
//         id: 'group1',
//         name: '好朋友群組',
//         members: [
//           {
//             id: 'user1',
//             displayName: '小明'
//           },
//           {
//             id: 'user2',
//             displayName: '小華'
//           },
//           {
//             id: 'user3',
//             displayName: '小李'
//           }
//         ]
//       }