<!-- 
  @todo: 
  - 還沒有引入資料的繫結
-->

<template lang="pug">
.user_inputs
  .input_wrapper.item-name
    input(type="text" v-model="localRecord.title" placeholder="項目名稱")
  .input_wrapper.value
    .icon.currency-btn(@click="isCurrencyListActive = !isCurrencyListActive")
      img(:src="'/icons/currency.png'")
      .currency-list(:class="{ 'active': isCurrencyListActive }")
        .currency-item(
          v-for="currency in currencyList" 
          :key="currency" 
          @click="setCurrency(currency)" 
          :class="{ 'active': localRecord.currency === currency }"
        ) {{ currency }}
    input(
      type="text"
      v-model.number="localRecord.value"
      placeholder="金額"
    )
    span.currency {{ localRecord.currency }}
  .input_wrapper.date
    .icon
      img(:src="'/icons/calendar.png'")
    input(placeholder="2024-10-26" v-model="localRecord.fullDate")
</template>

<script setup lang="ts">
import { ref, inject, reactive } from 'vue'
import type { Record, Participant, Payer } from '@/types/types'

const record = inject('currentRecord') as Ref<Record>
const currencyList = ref(['TWD', 'USD', 'JPY'])
const isCurrencyListActive = ref(false)
const localRecord = reactive({
  title: '',
  value: 0,
  currency: 'TWD',
  fullDate: '',
  participants: [] as Participant[],
  payers: {} as Payer,
  splitor: 'equal',
  group: null as { 
    id: string;
    name: string;
    members: Participant[];
  } | null
})

const setCurrency = (currency: string) => {
  localRecord.currency = currency
}

watch(() => record.value, (newRecord) => {
  localRecord.title = newRecord.title
  localRecord.value = newRecord.value
  localRecord.fullDate = newRecord.fullDate
  localRecord.participants = newRecord.participants
  localRecord.payers = newRecord.payers
  localRecord.splitor = newRecord.splitor
  localRecord.group = newRecord.group
})
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