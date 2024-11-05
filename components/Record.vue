<!-- 
 @todo:
 * - title 的樣式，是根據看到這個 record 的使用者，是否為債權人，還是債務人，來決定顏色
 * - 從該資料的 payer 是否是使用者，來決定 isPayer 的值 
 * - 完善計算的邏輯
 * - 從朋友端那邊進來，顯示的債務值，應該是只有針對該朋友，而非總和的債務
-->

<template lang="pug">
.record
  NuxtLink(:to="`/records/${recordId}`")
  .record__date
    .month {{ getSingleDigitMonth(month) }}月
    .day {{ date }}
  .record__content
    h2.title {{ title }}
    p.description {{ payerStr }}
  .record__hint
    h3.title(:class="titleClass") {{ hintTitle }}
    p.value {{ Math.abs(displayDebt) }} 元
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { setPaddingZero, getSingleDigitMonth, getDebts } from '@/utils/utils'
import type { Record as RecordProps, Payer } from '@/types/types'
import { useUserDataStore } from '@/store/userData'
import { useRouter } from 'vue-router'


const props = defineProps<{
  record: RecordProps
}>()

// const userId = ref(useUserDataStore().id)
const userId = ref("kmi4kmbqwn8z46e33987ktjt")

const { value, payers, fullDate, title, id: recordId } = toRefs(props.record)
const [ _, month, date ] = fullDate.value.toISOString().split("T")[0].split('-')

const isPayer = ref(payers.value.id === userId.value)

const hintTitle = computed(() => isPayer.value ? '可回收' : '應支付')
const titleClass = computed(() => ({
  'title--to-pay': !isPayer.value,
  'title--to-receive': isPayer.value
}))
const payerStr = computed(() => `${payers.value.displayName} 付了 ${value.value} 元`)
// 取得這筆紀錄中，目前使用者於這筆紀錄的 debt
const displayDebt = computed(() => getDebts(props.record, userId.value)[0].debt)
</script>

<style lang="sass" scoped>
.record
  *
    // border: 1px solid #000
.record
  display: flex
  justify-content: space-between
  align-items: center
  border-bottom: 1px solid rgba(#999, .4)
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

a
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 10
</style>