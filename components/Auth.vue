<template lang="pug">
#auth
  .logo
    img(:src="'/auth/logo.png'")
  form(@submit.prevent="handleSubmit")
    .wrapper
      input(
        v-model="formData.email" 
        type="email" 
        placeholder="電子信箱" 
        autocomplete="off"
      )
    .wrapper
      input(
        v-model="formData.password" 
        :type="isPasswordVisible ? 'text' : 'password'" 
        placeholder="密碼" 
        autocomplete="off"
      )
      .toggle(
        v-show="formData.password.trim() !== ''" 
        @click="isPasswordVisible = !isPasswordVisible"
      )
        img(:src="isPasswordVisible ? '/auth/eye_closed.png' : '/auth/eye.png'")
    template(v-if="isSignup")
      .wrapper
        input(
          v-model="formData.username" 
          type="text" 
          placeholder="名字（至少 3 個字）"
        )
      //- .wrapper
      //-   input(
      //-     v-model="formData.displayName" 
      //-     type="text" 
      //-     placeholder="暱稱"
      //-   )
    button(type="submit" @click="handleSubmit")
      .icon(v-if="status === Status.PENDING")
        img(src="/auth/loading.png")
      .text(v-else) {{ buttonText }}
  .switch(@click="isSignup = !isSignup") {{ switchText }}
  .result(
    v-if="resultMsg" 
    :class="status"
  ) {{ resultMsg }}
</template>

<script setup lang="ts">
import { login, signup } from '@/utils/api'
import { useVuelidate } from '@vuelidate/core'
import { required, email as isEmail, minLength } from '@vuelidate/validators' // 驗證器
import { useRouter } from 'vue-router'

const router = useRouter()
const initApp = inject('initApp') as () => Promise<void>
enum Status {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

const isSignup = ref(false)
const formData = reactive({
  email: '',
  password: '',
  username: '',
  displayName: '',
})
const isPasswordVisible = ref(false)
const status = ref<Status>(Status.IDLE)
const resultMsg = ref<string>('')

const buttonText = computed(() => isSignup.value ? '註冊' : '登入')
const switchText = computed(() => isSignup.value ? '我要登入' : '我要註冊')

// 根據是否註冊，回傳不同的驗證規則
const rules = computed(() => isSignup.value ? {
  username: { required, minLength: minLength(3) },
  // displayName: { required },
} : {
  email: { required, isEmail },
  password: { required, minLength: minLength(4) },
  }
)
const setStatus = (statusStr: Status) => {
  status.value = statusStr
}

const setResult = (result: string = '') => {
  resultMsg.value = result
}

const handleSignup = async () => {
  try {
    await signup(formData)
    setStatus(Status.SUCCESS)
    setResult('註冊成功，請稍等...')
    setTimeout(() => {
      isSignup.value = false
      Object.assign(formData, {
        email: formData.email,
        password: formData.password,
        username: '',
        displayName: '',
      })
    }, 2000)
  } catch (error: any) {
    throw error
  }
}

const handleLogin = async () => {
  try {
    await login({ identifier: formData.email, password: formData.password })
    setStatus(Status.SUCCESS)
    setResult('登入成功，請稍等...')
    setTimeout(async () => {
      await initApp()
      router.push('/account')
    }, 2000)
  } catch (error: any) {
    throw error
  }
}

const handleSubmit = async () => {
  const v$ = useVuelidate(rules.value, formData)
  const isValid = await v$.value.$validate()
  try {
    // 表單沒通過驗證
    if (!isValid) {
      setStatus(Status.ERROR)
      const error = v$.value.$errors
      setResult(`輸入有誤，請重新輸入：${error[0].$message}`)
      return
    }

    setStatus(Status.PENDING)
    // 註冊或登入
    isSignup.value ? await handleSignup() : await handleLogin()
  } catch (error: any) {
    setStatus(Status.ERROR)
    setResult(error.message)
  } finally {
    setTimeout(() => {
      setStatus(Status.IDLE)
      setResult('')
    }, 2000)
  }
}
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
  background-color: white
  

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
