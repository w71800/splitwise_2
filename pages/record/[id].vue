<!-- 
  @todo:
  - 要了解一下這邊原先使用 nextTick 的意義（這邊的 DOM 是怎麼更新的，更新循環是什麼）
  - 加上 Topbar
-->

<template lang="pug">
.page(v-if="isLoading")
  h1 正在加載...
.page(v-else-if="record")
  Topbar
  .page__header
    .header__title {{ record.title }}
    .header__value ${{ record.value }}
    .header__date {{ record.fullDate }}
  .page__body
    .body__content
      Detail(isPayer :payer="record.payers")
      Detail(v-for="debt in debts" :key="debt.id" :debt="debt")

.page(v-else)
  h1 找不到紀錄
  p 抱歉，無法找到 ID 為 {{ recordId }} 的紀錄。
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRecordsStore } from '@/store/records'
import type { Record, Debt } from '@/types/types'
import { getDebts } from '@/utils/utils'
import Detail from './components/Detail.vue'

const route = useRoute()
const router = useRouter()
const recordId = route.params.id as string

const { getRecordById } = useRecordsStore()
const record = ref<Record | null>(null)
const debts = ref<Debt[]>([])

const isLoading = ref(true)
onMounted(() => {
  const fetchedRecord = getRecordById(recordId)
  if (fetchedRecord) {
    record.value = fetchedRecord
    debts.value = getDebts(fetchedRecord)
  } else {
    console.error(`找不到 ID 為 ${recordId} 的紀錄`)
  }
  isLoading.value = false
})
</script>

<style scoped lang="sass">

.page
  &__header
    padding-bottom: 20px
    border-bottom: 1px solid rgba(0, 0, 0, 0.1)
  &__body
    padding: 20px 20px
    
      
      
      
.header
  &__title
    font-size: 1.2rem
    font-weight: $font_weight_regular
    margin-bottom: 6px
  &__value
    font-size: 1.8rem
    margin-bottom: .5rem
    font-weight: $font_weight_semibold
  &__date
    color: $color_text
  

</style>