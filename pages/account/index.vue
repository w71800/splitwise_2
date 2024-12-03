<template lang="pug">
.page
  h1 您好，{{ displayName }}
  .img__wrapper
    img(:src="avatar")
  p {{ email }}
  .signout(@click="handleSignout") 登出
</template>

<script setup lang="ts">
import useAuth from '@/composables/auth'
import { useRouter } from 'vue-router'
import { useUserDataStore } from '@/store/userData'
import { useRecordsStore } from '@/store/records'

const router = useRouter()
const { clearToken } = useAuth()

const { id, displayName, email, avatar } = storeToRefs(useUserDataStore())

const handleSignout = () => {
  const confirm = window.confirm('確定要登出嗎？')
  if (confirm) {
    // 清除所有的資料，含使用者、token、store 的資料
    clearToken()
    useRecordsStore().clearRecords()
    useUserDataStore().clearUserData()
    router.push('/auth')
  }
}


</script>

<style scoped lang="sass">
h1
  text-align: center
  margin-bottom: 20px

.img__wrapper
  +block_size(100px)
  border-radius: 50%
  overflow: hidden
  border: 6px solid $color-primary
  margin: 0 auto
  margin-bottom: 20px
  & img
    +block_size(100%)
    object-fit: cover
p
  text-align: center
  color: $color-text

.signout
  margin: 0 auto
  margin-top: 1rem
  width: fit-content
  color: $color_secondary
  font-weight: $font_weight_bold
  padding: 0px 4px
  padding-bottom: 2px
  border-bottom: 2px solid $color_secondary
</style>