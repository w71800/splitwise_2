import { defineStore } from 'pinia'

export const useSettlementsStore = defineStore('settlements', () => {
  const settlements = ref<Settlement[]>([])

  return { settlements }
})