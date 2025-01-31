/**
 * @todo:
 * - title 的樣式，是根據看到這個 record 的使用者，是否為債權人，還是債務人，來決定顏色
 * - 從該資料的 payer 是否是使用者，來決定 isPayer 的值
 */

<template lang="pug">
.record
  .record__date
    .month {{ getSingleDigitMonth(month) }}月
    .day {{ setPaddingZero(date) }}
  .record__content
    h2.title {{ title }}
    p.description {{ payerStr }}
  .record__hint
    h3.title(:class="titleClass") {{ hintTitle }}
    p.value {{ value }} 元
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { setPaddingZero, getSingleDigitMonth } from '@/utils/utils'
import type { Record as RecordProps } from '@/types/types'

const props = defineProps<{
  record: RecordProps
}>()

const { value, payers, fullDate, title } = toRefs(props.record)

const isPayer = ref(true)
const hintTitle = computed(() => isPayer.value ? '可回收' : '應支付')
const titleClass = computed(() => ({
  'title--to-pay': !isPayer.value,
  'title--to-receive': isPayer.value
}))
const [ _, month, date ] = fullDate.value.split('-')
const payerStr = computed(() => {
  if (payers.value.length === 1) {
    return `${payers.value[0]} 付了`
  }
  return `${payers.value.join('、')} 付了`
})
</script>

<style lang="sass" scoped>
.record
  *
    // border: 1px solid #000
.record
  display: flex
  justify-content: space-between
  align-items: center
  border-bottom: 1px solid #888
  margin-bottom: 20px
  // &__date, &__content, &__hint
  &__date
    flex-shrink: 0
    *
      text-align: center
      color: #888
    .month
      font-weight: $font_weight_regular
    .day
      font-size: 1.2rem
      font-weight: $font_weight_medium
  &__content
    flex-grow: 1
    padding: 0 20px
    .title
      font-size: 1.1rem
      font-weight: $font_weight_regular
    .description
      font-size: .9rem
      color: #888
      font-weight: $font_weight_regular
  &__hint
    flex-shrink: 0
    .title
      &--to-receive
        color: $color_primary // 應收款用綠色
      &--to-pay
        color: $color_secondary // 應付款用紅色
    .value
      // 樣式
</style>