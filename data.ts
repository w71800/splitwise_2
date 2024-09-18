import type { Record } from '@/types/types.ts'

export const fakeGroups = [
	{
    id: 1,
    name: '家裡事項',
    avatar: '/avatars/profile.jpg'
	},
	{
		id: 2,
		name: '日本行',
		avatar: '/avatars/profile.jpg'
	},
	{
    id: 3,
    name: '朋友聚會',
    avatar: '/avatars/profile.jpg'
	}
]

export const fakeRecords: Record[] = [
  {
    id: '1',
    title: '午餐',
    value: 300,
    fullDate: '2024-03-15',
    participants: [
      { id: '1', name: '小明', email: 'xiaoming@example.com', phone: '0912345678' },
      { id: '2', name: '小華', email: 'xiaohua@example.com', phone: '0923456789' }
    ],
    payers: [
      { id: '1', name: '小明', email: 'xiaoming@example.com', phone: '0912345678' }
    ],
    method: 'equal'
  },
  {
    id: '2',
    title: '電影票',
    value: 500,
    fullDate: '2024-03-20',
    participants: [
      { id: '1', name: '小明', email: 'xiaoming@example.com', phone: '0912345678' },
      { id: '2', name: '小華', email: 'xiaohua@example.com', phone: '0923456789' },
      { id: '3', name: '小芳', email: 'xiaofang@example.com', phone: '0934567890' }
    ],
    payers: [
      { id: '2', name: '小華', email: 'xiaohua@example.com', phone: '0923456789' }
    ],
    method: 'fixed'
  },
  {
    id: '3',
    title: '生日禮物',
    value: 120,
    fullDate: '2024-04-01',
    participants: [
      { id: '1', name: '小明', email: 'xiaoming@example.com', phone: '0912345678' },
      { id: '2', name: '小華', email: 'xiaohua@example.com', phone: '0923456789' },
      { id: '3', name: '小芳', email: 'xiaofang@example.com', phone: '0934567890' }
    ],
    payers: [
      { id: '1', name: '小明', email: 'xiaoming@example.com', phone: '0912345678' },
      { id: '2', name: '小華', email: 'xiaohua@example.com', phone: '0923456789' },
      { id: '3', name: '小芳', email: 'xiaofang@example.com', phone: '0934567890' }
    ],
    method: 'percentage'
  }
]