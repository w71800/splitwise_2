import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Record from '../Record.vue'


describe('Record.vue', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders correctly', () => {
    const pinia = createPinia()
    const wrapper = mount(Record, {
      global: {
        plugins: [pinia]
      },
      props: {
        record: {
          id: '1',
          value: 400,
          fullDate: "2024-08-01",
          participants: [{ id: "1", displayName: 'Alice' }, { id: "2", displayName: 'Bob' }],
          payers: { id: "1", displayName: 'Alice', paid: 400 },
          title: '火鍋聚餐',
          divisions: [{ id: "1", displayName: 'Alice', value: 300 }, { id: "2", displayName: 'Bob', value: 100 }],
          splitor: 'fixed'
        }
      }
    })
    expect(wrapper.text()).toContain('火鍋聚餐')
  })
})

it('computes displayDebt correctly', () => {
  const pinia = createPinia()
  const wrapper = mount(Record, {
    global: {
      plugins: [pinia]
    },
    props: {
      record: {
        id: '1',
        value: 400,
        fullDate: "2024-08-01",
        participants: [{ id: "1", displayName: 'Alice' }, { id: "2", displayName: 'Bob' }, { id: "3", displayName: '威利' }],
        payers: { id: "1", displayName: 'Alice', paid: 400 },
        title: '火鍋聚餐',
        divisions: [{ id: "1", displayName: 'Alice', value: 0 }, { id: "2", displayName: 'Bob', value: 1 }, { id: "3", displayName: '威利', value: 3 }],
        splitor: 'ratio'
      }
    }
  })
  const displayDebt = wrapper.vm.displayDebt
  expect(displayDebt).toBe(-400) // 根據你的邏輯，這裡應該是計算後的值
})