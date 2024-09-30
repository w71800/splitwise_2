# TODO 列表

## `app.vue`

- - 1. 將假資料集中在一個檔案中管理

## `components/Header.vue`

- - 修飾一下 summary 的呈現，或許可以把結構抽離出來作為一個元件

## `components/ListItem.vue`

- - 點入朋友或群組之後，會跳轉到對應的詳細頁面，並條列出所有相關的帳目。裡面會抓到該朋友/群組的資訊（可能要從 store 中抓取？或者動態從 api 中取得並做計算？）

## `components/Navbar.vue`

- - 要動態取得使用者 id

## `components/Record.vue`

- * - title 的樣式，是根據看到這個 record 的使用者，是否為債權人，還是債務人，來決定顏色

## `components/SearchInput.vue`

- - 每個人專屬的標籤，所以在 Record 的參與者中，要存放各自的標籤值

## `components/Topbar.vue`

- - 加上搜尋送出（還有需要做嗎？還是要把搜尋功能統一在搜尋頁面？）

## `layouts/default.vue`

- - 將 friends 和 groups 的頁面合併為一個共用的 layout

## `pages/friends/[id].vue`

- - 製作朋友頁面的呈現

## `pages/groups/[id].vue`

- - 繼續完善群組頁面的呈現

## `store/userData.ts`

- - 在沒有回傳一整包物件的狀況，要如何抓到這個 User 資料？

## `types/types.ts`

- * - 將 payers 改為多人

## `utils/utils.ts`

- * - 希望能夠把工具及撰寫的更加簡潔

