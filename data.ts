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
    currency: 'TWD',
    fullDate: '2024-03-15',
    participants: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', tags: ['未結清', '聚餐'], avatar: '/avatars/profile.jpg' },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', tags: ['未結清', '午餐'], avatar: '/avatars/profile.jpg' }
    ],
    divisions: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', value: 150, avatar: '/avatars/profile.jpg' },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', value: 150, avatar: '/avatars/profile.jpg' }
    ],
    payers: { id: "1", displayName: '威利', email: 'william@gmail.com', paid: 300, avatar: '/avatars/profile.jpg' },
    splitor: 'equal',
    group: {
      id: '1',
      name: '家裡事項',
      members: [
        { id: "1", displayName: '威利', email: 'william@gmail.com', avatar: '/avatars/profile.jpg' },
        { id: '2', displayName: '小華', email: 'xiaohua@example.com', avatar: '/avatars/profile.jpg' }
      ]
    },
    // group: null,
  },
  {
    id: '2',
    title: '電影票',
    value: 500,
    currency: 'TWD',
    fullDate: '2024-03-20',
    participants: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', tags: ['待整理', '娛樂'], avatar: '/avatars/profile.jpg' },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', tags: ['待整理', '電影'], avatar: '/avatars/profile.jpg' },
      { id: '3', displayName: '小芳', email: 'xiaofang@example.com', tags: ['待整理', '週末'], avatar: '/avatars/profile.jpg' }
    ],
    divisions: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', value: 200, avatar: '/avatars/profile.jpg' },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', value: 150, avatar: '/avatars/profile.jpg' },
      { id: '3', displayName: '小芳', email: 'xiaofang@example.com', value: 150, avatar: '/avatars/profile.jpg' }
    ],
    payers: { id: '2', displayName: '小華', email: 'xiaohua@example.com', paid: 500, avatar: '/avatars/profile.jpg' },
    splitor: 'fixed',
    group: {
      id: '3',
      name: '朋友聚會',
      members: [
        { id: "1", displayName: '威利', email: 'william@gmail.com', avatar: '/avatars/profile.jpg' },
        { id: '2', displayName: '小華', email: 'xiaohua@example.com', avatar: '/avatars/profile.jpg' },
        { id: '3', displayName: '小芳', email: 'xiaofang@example.com', avatar: '/avatars/profile.jpg' }
      ]
    }
  },
  {
    id: '3',
    title: '生日禮物',
    value: 120,
    currency: 'TWD',
    fullDate: '2024-04-01',
    participants: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', tags: ['未結清', '禮物'], avatar: '/avatars/profile.jpg' },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', tags: ['未結清', '生日'], avatar: '/avatars/profile.jpg' },
      { id: '3', displayName: '小芳', email: 'xiaofang@example.com', tags: ['未結清', '慶祝'], avatar: '/avatars/profile.jpg' }
    ],
    divisions: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', value: 20, avatar: '/avatars/profile.jpg' },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', value: 40, avatar: '/avatars/profile.jpg' },
      { id: '3', displayName: '小芳', email: 'xiaofang@example.com', value: 40, avatar: '/avatars/profile.jpg' }
    ],
    payers: { id: "1", displayName: '威利', email: 'william@gmail.com', paid: 120, avatar: '/avatars/profile.jpg' },
    splitor: 'percentage',
    group: {
      id: '3',
      name: '朋友聚會',
      members: [
        { id: "1", displayName: '威利', email: 'william@gmail.com', avatar: '/avatars/profile.jpg' },
        { id: '2', displayName: '小華', email: 'xiaohua@example.com', avatar: '/avatars/profile.jpg' },
        { id: '3', displayName: '小芳', email: 'xiaofang@example.com', avatar: '/avatars/profile.jpg' }
      ]
    }
  },
  {
    id: '4',
    title: '晚餐',
    value: 200,
    currency: 'TWD',
    fullDate: '2024-04-05',
    participants: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', tags: ['待整理', '晚餐'], avatar: '/avatars/profile.jpg' },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', tags: ['待整理', '聚會'], avatar: '/avatars/profile.jpg' },
      { id: '3', displayName: '小芳', email: 'xiaofang@example.com', tags: ['待整理', '朋友'], avatar: '/avatars/profile.jpg' }
    ],
    divisions: [
      { id: "1", displayName: '威利', email: 'william@gmail.com', value: 1, avatar: '/avatars/profile.jpg' },
      { id: '2', displayName: '小華', email: 'xiaohua@example.com', value: 1, avatar: '/avatars/profile.jpg' },
      { id: '3', displayName: '小芳', email: 'xiaofang@example.com', value: 2, avatar: '/avatars/profile.jpg' }
    ],
    payers: { id: "1", displayName: '威利', email: 'william@gmail.com', paid: 200, avatar: '/avatars/profile.jpg' },
    splitor: 'ratio',
    group: {
      id: '2',
      name: '日本行',
      members: [
        { id: "1", displayName: '威利', email: 'william@gmail.com', avatar: '/avatars/profile.jpg' },
        { id: '2', displayName: '小華', email: 'xiaohua@example.com', avatar: '/avatars/profile.jpg' },
        { id: '3', displayName: '小芳', email: 'xiaofang@example.com', avatar: '/avatars/profile.jpg' }
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