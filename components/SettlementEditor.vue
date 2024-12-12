<template lang="pug">
.settlement-editor
  .background
  .editor
    .editor__close-button(@click="toggleSettlementEditor") 關閉
    .editor__title 結算設定
    .editor__settlements-list
      .editor__settlements-item(v-for="(settlement, index) in settlements" :key="settlement")
        .participants
          .debtor(:class="{ 'is-user': isUser(settlement.debtor.id) }") {{ isUser(settlement.debtor.id) ? '你' : settlement.debtor.displayName }}
          .arrow
            img(src="/icons/right-arrow.png")
          .creditor(:class="{ 'is-user': isUser(settlement.creditor.id) }") {{ isUser(settlement.creditor.id) ? '你' : settlement.creditor.displayName }}
        .settlement-info
          input.value(type="number" v-model="settlements[index].value")
          .currency {{ settlement.currency }}
    .editor__button(@click="handleClick") 確定
</template>

<script setup lang="ts">
import { useSettlementsStore, transformSettlement } from '@/store/settlements'
import { useUserDataStore } from '@/store/userData'
import { useRecordsStore } from '@/store/records';
import { postRecord } from '@/utils/api';

const settlementsStore = useSettlementsStore()
const { settlements } = storeToRefs(settlementsStore)
const { toggleSettlementEditor } = settlementsStore
const recordStore = useRecordsStore()
const { addRecord } = recordStore

const userDataStore = useUserDataStore()

const isUser = (id: string) => {
  return id === userDataStore.id
}

const handleClick = async () => {
  let idList = []
  console.log("click");
  // 取得 settlement 之後，遍歷他們形成對應的 record
  const records = settlements.value.map(settlement => transformSettlement(settlement))
  // 透過 api postRecord 去處理
  records.forEach(async record => {
    try {
      console.log(record);
      let result = await postRecord(record)
      idList.push(result)
      await addRecord({ ...record, id: result })
    } catch(error) {
      console.log(error);
    }
  })
}

// const displayName = (settlement: Settlement) => {
//   return isUser(settlement.debtor.id) ? '你' : settlement.debtor.displayName
// }
</script>

<style scoped lang="sass">
$color-simple: #929292
.settlement-editor
  +block_size(100vw, 100vh)
  position: fixed
  top: 0
  left: 0
  z-index: 999
  display: flex
  justify-content: center
  align-items: center

.background
  +block_size(100%)
  position: absolute
  left: 0
  top: 0
  background-color: rgba(white, 0.5)
  backdrop-filter: blur(8px)
  -webkit-backdrop-filter: blur(8px)

.editor
  $editor-width: 400px
  width: $editor-width
  min-width: $editor-width
  padding: 20px 30px
  border: 1px solid #D5D5D5
  border-radius: 8px
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1)
  background-color: #fff
  &__title
    font-size: 1.4rem
    font-weight: 600
    color: $color-simple
    text-align: center
    margin-bottom: 30px
    padding-bottom: 10px
    border-bottom: 1px solid #D5D5D5
  &__settlements-list
    margin-bottom: 30px
  &__settlements-item
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 20px
  &__button
    width: fit-content
    margin: 0 auto
    padding: 8px 12px
    border-radius: 6px
    background-color: $color-secondary
    color: white
    cursor: pointer
    box-shadow: 0 3px 0px 0 darken($color-secondary, 13%)
    transition: all 0.2s ease
    &:active
      box-shadow: none
      transform: translateY(3px)
  &__close-button
    position: absolute
    top: 10px
    right: 12px
    cursor: pointer
    font-size: .9rem
    color: $color-simple
    opacity: 0.5
    &:hover
      opacity: 1
  
  .participants
    display: grid
    grid-template-columns: 1fr 40px 1fr
    *
      color: $color-simple
    .debtor
      text-align: right
    *.is-user
      color: $color-primary
      font-weight: 600
  
  
  .arrow
    +block_size(20px)
    margin: 0 10px
    img
      +block_size(100%)
      object-fit: cover

  
  .settlement-info
    display: flex
    align-items: center
    justify-content: space-between
    gap: 10px
    *
      color: $color-simple
    input
      border: 1px solid $color-simple
      border-radius: 4px
      padding: 4px 8px
      width: 75px
</style>
