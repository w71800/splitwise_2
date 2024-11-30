<template lang="pug">
  #auth
    .logo
      img(:src="'/auth/logo.png'")
    form(@submit.prevent="handleSubmit")
      .wrapper
        input(v-model="email" type="email" placeholder="電子信箱" autocomplete="off")
      .wrapper
        input(v-model="password" :type="isPasswordVisible ? 'text' : 'password'" placeholder="密碼" autocomplete="off")
        .toggle(@click="isPasswordVisible = !isPasswordVisible")
          img(:src="isPasswordVisible ? '/auth/eye_closed.png' : '/auth/eye.png'")
      .wrapper(v-if="isSignup")
        input(v-model="username" type="text" placeholder="名字")
      .wrapper(v-if="isSignup")
        input(v-model="displayName" type="text" placeholder="暱稱")
      button(type="submit")
        .icon(v-if="status === Status.PENDING")
          img(src="/auth/loading.png")
        .text(v-else) {{ buttonText }}
    .switch(@click="isSignup = !isSignup") {{ switchText }}
    .result(v-if="resultMsg" :class="status") {{ resultMsg }}
</template>

<script setup lang="ts">
enum Status {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

const isSignup = ref(true)
const email = ref('')
const isPasswordVisible = ref(false)
const status = ref<Status>(Status.IDLE)

const resultMsg = computed(() => { // 這邊要做一個函數，能夠根據 status 回傳不同的訊息：訊息（狀態碼）
  if (status.value === Status.SUCCESS) return '註冊成功'
  if (status.value === Status.ERROR) return '註冊失敗'
  return false
})
const buttonText = computed(() => isSignup.value ? '註冊' : '登入')
const switchText = computed(() => isSignup.value ? '我要登入' : '我要註冊')

</script>

<style scoped lang="sass">
$color_active: #929292
$color_inactive: #D5D5D5

@keyframes loading
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)

#auth
  padding: 20px 20px
  padding-bottom: 40px
  width: 60%
  max-width: 400px
  min-width: 300px
  height: 420px
  display: grid
  grid-template-rows: auto 1fr auto auto
  border-radius: 10px
  box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.1)
  background-color: darken(white, 1%)
  

.logo
  grid-row: 1 / 2
  +block_size(40px)
  margin: 0 auto
  margin-bottom: 20px
  img
    +block_size(100%)
    object-fit: cover


form
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: 15px
  grid-row: 2 / 3
  .wrapper
    width: 80%
    &:first-child
      margin-top: auto


form input
  width: 100%
  appearance: none
  border: none
  background-color: transparent
  border-radius: 6px
  font-size: 13px
  padding: 6px
  letter-spacing: 1px
  &::placeholder
    color: $color_inactive
  
  &:placeholder-shown
    border: 1px solid $color_inactive

  &:not(:placeholder-shown)
    border: 1px solid $color_active
    color: $color_active

.toggle
  +block_size(20px)
  position: absolute
  right: 5px
  top: 50%
  transform: translateY(-50%)
  cursor: pointer
  img
    +block_size(100%)
    object-fit: contain

form button
  border: none
  outline: none
  background-color: $color_primary
  color: white
  font-weight: bold
  font-size: 16px
  padding: 6px 20px
  border-radius: 8px
  letter-spacing: 2px
  margin-top: auto
  .icon, .text
    +block_size(36px, 22.5px)
  .icon
    animation: loading 2s linear infinite
    img
      +block_size(100%)
      object-fit: contain

.switch
  grid-row: 3 / 4
  color: #D5D5D5
  font-size: 13px
  text-align: center
  cursor: pointer
  padding: 10px 10px
  padding-top: 20px
  width: fit-content
  margin: 0 auto


.result
  position: absolute
  bottom: 8px
  width: 100%
  font-size: 13px
  text-align: center
  &.success
    color: $color_primary
  &.error
    color: $color_secondary
</style>
