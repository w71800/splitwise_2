# TODO 列表

## `app.vue`

- 將假資料集中在一個檔案中管理
首頁顯示最新動態之類的東西，沒登入的話（例如沒有 token），顯示登入頁面。且不顯示 topbar 和 navbar
實作記錄編輯頁面
實作紀錄增加功能
一些還款、欠款、應支付、可回收等狀態的顯示優化。目前的版本看到會有點不直觀。例如說群組或朋友頁面中。小華：應支付 152 元。這樣應該是指我欠小華 152 元。但字面上看起來是小華要給我 152 元。
>


## `components/Header.vue`

- 修飾一下 summary 的呈現，或許可以把結構抽離出來作為一個元件
撰寫 summary 的單元測試


## `components/ListItem.vue`

- 點入朋友或群組之後，會跳轉到對應的詳細頁面，並條列出所有相關的帳目。裡面會抓到該朋友/群組的資訊（可能要從 store 中抓取？或者動態從 api 中取得並做計算？）
>


## `components/Navbar.vue`

- 要動態取得使用者 id
用 margin 來做中間的分隔
調整一下 CSS 的寫法
在進入群組或朋友的子頁時，navbar 一樣要有 highlight 的效果
>


## `components/Record.vue`

- * - title 的樣式，是根據看到這個 record 的使用者，是否為債權人，還是債務人，來決定顏色


## `components/SearchInput.vue`

- 每個人專屬的標籤，所以在 Record 的參與者中，要存放各自的標籤值
>


## `components/Topbar.vue`

- 加上搜尋送出（還有需要做嗎？還是要把搜尋功能統一在搜尋頁面？）
>


## `layouts/default.vue`

- 將 friends 和 groups 的頁面合併為一個共用的 layout
>


## `pages/friends/[id].vue`

- 製作朋友頁面的呈現
摘要的部分應該要更改為每個使用者專屬的摘要，例如說可以看到自己欠了誰多少錢，或是被多少人欠錢，而不用看到所有人的摘要
>


## `pages/groups/[id].vue`

- 繼續完善群組頁面的呈現
>


## `pages/record/[id].vue`

- 要了解一下這邊原先使用 nextTick 的意義（這邊的 DOM 是怎麼更新的，更新循環是什麼）
加上 Topbar
>


## `pages/record/components/Detail.vue`

- 有沒有更好整合性寫法，可以將兩者整合在一起？（使用 v-if 有點浪費效能）
>


## `pages/search/index.vue`

- 要不要把 store 集中起來管理？
>


## `store/userData.ts`

- 在沒有回傳一整包物件的狀況，要如何抓到這個 User 資料？


## `types/types.ts`

- * - 將 payers 改為多人


## `utils/utils.ts`

- * - 希望能夠把工具及撰寫的更加簡潔


