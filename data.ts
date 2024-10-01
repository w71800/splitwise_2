import type { Record, User } from '@/types/types'

export const fakeGroups = [
	{
    id: '1',
    name: '家裡事項',
    avatar: '/avatars/profile.jpg'
	},
	{
		id: '2',
		name: '日本行',
		avatar: '/avatars/profile.jpg'
	},
	{
    id: '3',
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
      { id: "1", displayName: '威利', email: 'william@gmail.com', tags: ['未結清', '聚餐'] },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', tags: ['未結清', '午餐'] }
    ],
    divisions: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', value: 150 },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', value: 150 }
    ],
    payers: { id: "1", displayName: '威利', email: 'william@gmail.com', paid: 300 },
    splitor: 'equal',
    group: {
      id: '1',
      name: '家裡事項',
      members: [
        { id: "1", displayName: '威利', email: 'william@gmail.com' },
        { id: '2', displayName: '小華', email: 'xiaohua@example.com' }
      ]
    }
  },
  {
    id: '2',
    title: '電影票',
    value: 500,
    fullDate: '2024-03-20',
    participants: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', tags: ['待整理', '娛樂'] },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', tags: ['待整理', '電影'] },
      { id: '3', displayName: '小芳', email: 'xiaofang@example.com', tags: ['待整理', '週末'] }
    ],
    divisions: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', value: 200 },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', value: 150 },
      { id: '3', displayName: '小芳', email: 'xiaofang@example.com', value: 150 }
    ],
    payers: { id: '2', displayName: '小華', email: 'xiaohua@example.com', paid: 500 },
    splitor: 'fixed',
    group: {
      id: '3',
      name: '朋友聚會',
      members: [
        { id: "1", displayName: '威利', email: 'william@gmail.com' },
        { id: '2', displayName: '小華', email: 'xiaohua@example.com' },
        { id: '3', displayName: '小芳', email: 'xiaofang@example.com' }
      ]
    }
  },
  {
    id: '3',
    title: '生日禮物',
    value: 120,
    fullDate: '2024-04-01',
    participants: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', tags: ['未結清', '禮物'] },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', tags: ['未結清', '生日'] },
      { id: '3', displayName: '小芳', email: 'xiaofang@example.com', tags: ['未結清', '慶祝'] }
    ],
    divisions: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', value: 20 },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', value: 40 },
      { id: '3', displayName: '小芳', email: 'xiaofang@example.com', value: 40 }
    ],
    payers: { id: "1", displayName: '威利', email: 'william@gmail.com', paid: 120 },
    splitor: 'percentage',
    group: {
      id: '3',
      name: '朋友聚會',
      members: [
        { id: "1", displayName: '威利', email: 'william@gmail.com' },
        { id: '2', displayName: '小華', email: 'xiaohua@example.com' },
        { id: '3', displayName: '小芳', email: 'xiaofang@example.com' }
      ]
    }
  },
  {
    id: '4',
    title: '晚餐',
    value: 200,
    fullDate: '2024-04-05',
    participants: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', tags: ['待整理', '晚餐'] },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', tags: ['待整理', '聚會'] },
      { id: '3', displayName: '小芳', email: 'xiaofang@example.com', tags: ['待整理', '朋友'] }
    ],
    divisions: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', value: 1 },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', value: 1 },
      { id: '3', displayName: '小芳', email: 'xiaofang@example.com', value: 2 }
    ],
    payers: { id: "1", displayName: '威利', email: 'william@gmail.com', paid: 200 },
    splitor: 'ratio',
    group: {
      id: '2',
      name: '日本行',
      members: [
        { id: "1", displayName: '威利', email: 'william@gmail.com' },
        { id: '2', displayName: '小華', email: 'xiaohua@example.com' },
        { id: '3', displayName: '小芳', email: 'xiaofang@example.com' }
      ]
    }
  }
]

export const fakeUser: User = {
  id: "1",
  displayName: '威利',
  email: 'william@gmail.com',
  avatar: '/avatars/profile.jpg'
}

export const fakeFriends: User[] = [
  {
    id: '2',
    displayName: '小華',
    email: 'xiaohua@example.com',
    avatar: '/avatars/profile.jpg'
  },
  {
    id: '3',
    displayName: '小芳',
    email: 'xiaofang@example.com',
    avatar: '/avatars/profile.jpg'
  }
]