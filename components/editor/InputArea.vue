<!-- 
  @todo: 
  - 還沒有引入資料的繫結
-->

<template lang="pug">
.user_inputs
  .input_wrapper.item-name
    input(type="text" v-model="title" placeholder="項目名稱")
  .input_wrapper.value
    .icon.currency-btn(@click="isCurrencyListActive = !isCurrencyListActive")
      img(:src="'/icons/currency.png'")
      .currency-list(:class="{ 'active': isCurrencyListActive }")
        .currency-item(
          v-for="currency in currencyList" 
          :key="currency" 
          @click="setCurrency(currency)" 
          :class="{ 'active': currentCurrency === currency }"
        ) {{ currency }}
    input(
      type="text"
      v-model.number="value"
      placeholder="金額"
    )
    span.currency {{ currentCurrency }}
  .input_wrapper.date
    .icon
      img(:src="'/icons/calendar.png'")
    input(placeholder="2024-10-26")
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Record } from '@/types/types'

const currencyList = ref(['TWD', 'USD', 'JPY'])
const currentCurrency = ref('TWD')
const isCurrencyListActive = ref(false)

const editingRecord = inject('editingRecord') as Record
const currentRecord = inject('currentRecord') as Record

const { title, value, fullDate, participants, payers, splitor, group } = toRefs(currentRecord)

const setCurrency = (currency: string) => {
  currentCurrency.value = currency
}
</script>

<style scoped lang="sass">
.user_inputs
  padding: 40px 0px
  display: flex
  flex-direction: column
  gap: 40px
  margin-bottom: 10px

  .input_wrapper
    display: flex
    align-items: center
    .icon
      +block_size(35px)
      margin-right: 20px
      flex-shrink: 0
    .icon.currency-btn
      cursor: pointer
      border: 2px solid #5E5E5E
      border-radius: 10px
      padding: 5px
    input
      font-size: 23px
      font-weight: $font-weight-bold
      border-bottom: 1px solid #5E5E5E
      text-align: left
      min-width: 100px
    input::placeholder
      color: rgba(#5e5e5e, 0.3)
  
  .input_wrapper 
    &.item-name
      input
        width: 100%
        text-align: center
    &.value, &.date
      margin-left: 10px
    &.value
      input
        width: 100%
      .currency
        font-weight: $font-weight-regular
        color: #5E5E5E
        font-size: 1rem
        margin-left: 20px
    &.date
      input
        width: 100%
  
  .currency-list
    display: none
    position: absolute
    border: 1px solid #000
    border-radius: 6px
    bottom: 0px
    left: 50%
    transform: translateX(-50%) translateY(calc(100% + 10px))
    font-size: 1rem
    flex-direction: column
    gap: 10px
    padding: 10px 0px
    background-color: #fff
    z-index: 99
    .currency-item
      padding: 0 10px
      cursor: pointer
      text-align: left

.currency-list
  &.active
    display: flex !important
  .currency-item
    &.active
      font-weight: $font-weight-bold
      color: $color-primary

</style>