<template lang="pug">
.page
  .records
    Record(v-for="record in displayRecords" :key="record.id" :record="record")
</template>

<script setup lang="ts">
import { useRecordsStore } from '@/store/records'
import { filterRecords } from '@/utils/utils'

definePageMeta({
  layout: 'search'
})

const activeTags = inject<Ref<string[]>>('activeTags')
const { records } = storeToRefs(useRecordsStore())

const displayRecords = computed(() => filterRecords(records.value, { tags: activeTags.value }))


</script>
<style scoped lang="sass">
.page
  padding-bottom: 65px
</style>
