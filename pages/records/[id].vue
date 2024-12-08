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
    .header__title {{ title }}
    .header__value ${{ value }}
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
      .header__trashcan(@click="handleDeleteRecord")
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRecordsStore } from '@/store/records'
import { getDebts, getSingleDigitMonth } from '@/utils/utils'
import { useUserDataStore } from '@/store/userData'
import { useRouter } from 'vue-router'
import * as api from '@/utils/api'
import { useSideNotification } from '@/utils/composable'


const router = useRouter()
const route = useRoute()
const { id: recordId } = route.params as { id: string }
const userDataStore = useUserDataStore()
const { id: userId } = storeToRefs(userDataStore)

const showNotification = useSideNotification()

const { getRecordById, deleteRecord, createDebtTracker } = useRecordsStore() // NOTE: 這邊透過這個 getter 拿出來的紀錄，會保持響應性嗎？
const { records } = storeToRefs(useRecordsStore())

const debtTracker = computed(() => createDebtTracker(recordId))
const record = computed(() => getRecordById(recordId))
const title = computed(() => record.value?.title || '')
const value = computed(() => record.value?.value || 0)
const debts = computed(() => record.value ? getDebts(record.value) : [])
const tags = computed(() => record.value?.participants.find(participant => participant.id === userId.value)?.tags || [])
const group = computed(() => record.value?.group?.name || null)
// const isLoading = ref(true)

const displayDate = computed(() => {
  const [ year, month, day ] = record.value?.fullDate?.toISOString().split("T")[0].split('-') || ["1900", "1", "1"]
  return `${year} 年 ${month} 月 ${day} 日`
})

const handleDeleteRecord = async () => {
  let yes = confirm('確定要刪除這筆紀錄嗎？')
  if (yes) {
    try {
      await api.deleteRecord(recordId)
      await deleteRecord(recordId)
      router.push('/search')
      
      setTimeout(() => {
        showNotification('success')
      }, 1000)
    } catch (error) {
      console.error(error)
      showNotification('error')
    }
  }
}
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