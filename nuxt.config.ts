import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  alias: {
    '@': resolve(__dirname, './')
  },
  css: ['@/assets/global.sass'], // 在每一個頁面中的 head 都引入 global.sass 作為全局樣式
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "@/assets/variables.sass" as *\n' // 將每一個 sass 的開頭都引入變數檔案
        }
      }
    }
  }
})
