import type { Record, User } from '@/types/types'

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
      { id: "1", displayName: '威利', email: 'william@gmail.com' },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com' }
    ],
    divisions: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', value: 150 },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', value: 150 }
    ],
    payers: { id: "1", displayName: '威利', email: 'william@gmail.com', paid: 300 },
    splitor: 'equal'
  },
  {
    id: '2',
    title: '電影票',
    value: 500,
    fullDate: '2024-03-20',
    participants: [
      { id: "1", displayName: '威利', email: 'william@gmail.com' },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com' },
      { id: '3', displayName: '小芳', email: 'xiaofang@example.com' }
    ],
    divisions: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', value: 200 },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', value: 150 },
      { id: '3', displayName: '小芳', email: 'xiaofang@example.com', value: 150 }
    ],
    payers: { id: '2', displayName: '小華', email: 'xiaohua@example.com', paid: 500 },
    splitor: 'fixed'
  },
  {
    id: '3',
    title: '生日禮物',
    value: 120,
    fullDate: '2024-04-01',
    participants: [
      { id: "1", displayName: '威利', email: 'william@gmail.com' },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com' },
      { id: '3', displayName: '小芳', email: 'xiaofang@example.com' }
    ],
    divisions: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', value: 20 },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', value: 40 },
      { id: '3', displayName: '小芳', email: 'xiaofang@example.com', value: 40 }
    ],
    payers: { id: "1", displayName: '威利', email: 'william@gmail.com', paid: 40 },
    splitor: 'percentage'
  },
  {
    id: '4',
    title: '晚餐',
    value: 200,
    fullDate: '2024-04-05',
    participants: [
      { id: "1", displayName: '威利', email: 'william@gmail.com' },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com' },
      { id: '3', displayName: '小芳', email: 'xiaofang@example.com' }
    ],
    divisions: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', value: 1 },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', value: 1 },
      { id: '3', displayName: '小芳', email: 'xiaofang@example.com', value: 2 }
    ],
    payers: { id: "1", displayName: '威利', email: 'william@gmail.com', paid: 200 },
    splitor: 'ratio'
  }
]

export const fakeUser: User = {
  id: "1",
  displayName: '威利',
  email: 'william@gmail.com',
  avatar: '/avatars/profile.jpg'
}