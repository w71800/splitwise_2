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
          divisions: [{ id: "1", displayName: 'Alice', value: 200 }, { id: "2", displayName: 'Bob', value: 200 }],
          splitor: 'equal'
        }
      }
    })
    expect(wrapper.text()).toContain('火鍋聚餐')
  })
})