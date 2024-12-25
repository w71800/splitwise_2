<!-- 
  @todo: 
  - 還沒有引入資料的繫結
-->

<template lang="pug">
.user_inputs
  .input_wrapper.item-name
    input(type="text" v-model="record.title" placeholder="項目名稱")
  .input_wrapper.value
    .currency-btn(@click="isCurrencyListActive = !isCurrencyListActive")
      .btn(:active="isCurrencyListActive")
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
      auto-apply
      :time-picker="false"
      :format="displayDate"
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


const displayDate = computed(() => {
  return (date: Date) => {
    const isToday = date.toDateString() === new Date().toDateString()
    return isToday ? '今天' : date.toISOString().split('T')[0]
  }
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
      margin-right: 20px
      flex-shrink: 0
    .currency-btn
      +block_size(35px)
      margin-right: 20px
      top: 0px
      cursor: pointer
      flex-shrink: 0
      -webkit-tap-highlight-color: transparent
      .btn
        +block_size(100%)
        margin: 0
        padding: 4px
        opacity: 0.8
        border: 2px solid #5E5E5E
        border-radius: 10px
        $transition-duration: 0.2s
        transition: top $transition-duration, box-shadow $transition-duration
        img
          +block_size(100%)
          object-fit: contain
        // +debug()
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
    $space: 12px
    height: 0px
    overflow: hidden
    position: absolute
    border-radius: 6px
    bottom: 0px
    left: 50%
    transform: translateX(-50%) translateY(calc(100% + 10px))
    font-size: 1rem
    flex-direction: column
    gap: $space
    // padding: 10px 0px
    background-color: #fff
    z-index: 100
    box-shadow: -2px 2px 5px 0px rgba(lighten(#5E5E5E, 30), .7)
    opacity: 0
    transition: height 0.3s, opacity 0.3s
    .currency-item
      padding: 0 15px
      cursor: pointer
      text-align: left
      &:first-child
        margin-top: $space
      &:last-child
        margin-bottom: $space
        

.currency-btn
  .btn[active="false"]
    top: 0
    box-shadow: 0px 3px 0px 0px rgba(lighten(#5E5E5E, 30), .7)
  .btn[active="true"]
    top: 3px
    box-shadow: none
  
.currency-list
  &.active
    display: flex !important
    height: auto
    opacity: 1
  .currency-item
    &:not(.active)
      color: rgba(#5E5E5E, 0.7)
    &.active
      font-weight: $font-weight-bold
      color: $color-primary

</style>