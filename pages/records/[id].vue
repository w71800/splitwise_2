<!-- 
  @todo:
  - 要了解一下這邊原先使用 nextTick 的意義（這邊的 DOM 是怎麼更新的，更新循環是什麼）
  - 加上 Topbar
  - 會有個奇怪的高度變化，比其餘頁面的高度還高一些
-->

<template lang="pug">
.page(v-if="isLoading")
  h1 正在加載...
.page(v-else-if="record")
  .page__header
    .header__title {{ record.title }}
    .header__value ${{ record.value }}
    .header__date {{ displayDate }}
    .bottom
      .left
        .header__group(v-if="group")
          .icon
            img(src="/icons/group_active.png")
          span {{ group }}
        .header__tags(v-if="tags && tags.length > 0")
          .icon
            img(src="/icons/tag_active.png")
          span.tag(v-for="tag in tags" :key="tag.id" :tag="tag") {{ `#${tag}` }}
      .header__trashcan
        .icon
          img(src="/icons/trashcan.png")
  .page__body
    .body__content
      Detail(isPayer :payer="record.payers")
      Detail(v-for="debt in debts" :key="debt.id" :debt="debt")
.page(v-else)
  h1 找不到紀錄
  p 抱歉，無法找到 ID 為 {{ recordId }} 的紀錄。
</template>

<script setup lang="ts">
import Detail from './components/Detail.vue'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRecordsStore } from '@/store/records'
import type { Record, Debt } from '@/types/types'
import { getDebts, getSingleDigitMonth } from '@/utils/utils'
import { useUserDataStore } from '@/store/userData'

const route = useRoute()
const { id: recordId } = route.params
const { id: userId } = useUserDataStore()

const { getRecordById } = useRecordsStore()
// NOTE: 如果把這些必要的資料，用一包物件包起來管理如何？
const record = ref<Record | null>(null)
const debts = ref<Debt[]>([])
const tags = ref<string[]>([])
const group = ref<string | null>(null)
const isLoading = ref(true)

const displayDate = computed(() => {
  const [ year, month, day ] = record.value?.fullDate?.toISOString().split("T")[0].split('-') || ["1900", "1", "1"]
  return `${year} 年 ${getSingleDigitMonth(month)} 月 ${day} 日`
})

onMounted(() => {
  const fetchedRecord = getRecordById(recordId as string)
  if (fetchedRecord) {
    record.value = fetchedRecord
    debts.value = getDebts(fetchedRecord)
    tags.value = fetchedRecord.participants.find(participant => participant.id === userId)?.tags || []
    group.value = fetchedRecord.group?.name || null
  } else {
    console.error(`找不到 ID 為 ${recordId} 的紀錄`)
  }
  isLoading.value = false
})
</script>

<style scoped lang="sass">
.icon
  +block_size(18px)
  margin-right: 8px
  img
    +block_size(100%)
    object-fit: contain
.bottom
  padding: 10px 0
  display: flex
  align-items: center
  justify-content: space-between
  // +debug()
.left
  display: flex
  align-items: center


.page
  &__header
    border-bottom: 1px solid rgba(0, 0, 0, 0.1)
  &__body
    padding: 20px 0px
    padding-bottom: 0
          

.header
  &__title
    font-size: 1.3rem
    font-weight: $font_weight_regular
  &__value
    font-size: 2rem
    margin-bottom: 10px
    font-weight: $font_weight_bold
  &__date
    color: #cbcbcb
    font-size: .9rem
    font-weight: $font_weight_regular
    margin-bottom: 2rem
  &__group, &__tags
    display: inline-flex
    align-items: center
    font-size: .7rem
    color: $color_primary
    opacity: 0.8
  &__group
    margin-right: 20px
  &__tags
    span
      color: $color_primary
      margin-right: .5rem
  &__trashcan
    cursor: pointer
    .icon
      +block_size(22px)
      margin: 0
</style>