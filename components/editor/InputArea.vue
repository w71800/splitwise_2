<!-- 
  @todo: 
  - 還沒有引入資料的繫結
-->

<template lang="pug">
.user_inputs
  .input_wrapper.item-name
    input(type="text" v-model="record.title" placeholder="項目名稱")
  .input_wrapper.value
    .icon.currency-btn(@click="isCurrencyListActive = !isCurrencyListActive")
      img(:src="'/icons/currency.png'")
      .currency-list(:class="{ 'active': isCurrencyListActive }")
        .currency-item(
          v-for="currency in currencyList" 
          :key="currency" 
          @click="setCurrency(currency)" 
          :class="{ 'active': currency === record.currency }"
        ) {{ currency }}
    input(
      type="text"
      v-model.number="record.value"
      placeholder="金額"
    )
    span.currency {{ record.currency }}
  .input_wrapper.date
    .icon 
      img(:src="'/icons/calendar.png'")
    DatePicker(
      v-model="record.fullDate" 
      hide-input-icon
      :time-picker="false"
      :format="dateFormat"
      :ui=`{
        input: 'datepicker__input'
      }`
    )
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useEditorStore } from '@/store/editor'
import { storeToRefs } from 'pinia'
import DatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css';

const currencyList = ['TWD', 'USD', 'JPY']
const editorStore = useEditorStore()

const { record } = storeToRefs(editorStore)
const isCurrencyListActive = ref(false)


const dateFormat = computed(() => {
  return (date: Date) => date.toISOString().split('T')[0]
})

const setCurrency = (currency: string) => {
  record.value.currency = currency
}



watch(() => record, (newRecord) => {
  console.log(newRecord)
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