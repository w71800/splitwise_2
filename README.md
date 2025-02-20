# Self-Made Splitwise

![](https://i.imgur.com/qi2LfDv.png)

Self-Made Splitwise 是一參考自「Splitwise」的簡單易用的分帳應用程式。可以幫助你和朋友、家人或群組輕鬆管理共同支出與帳務。以下是一些技術細節：
- Tech Stack：採用 Nuxt.js 作為主要框架，並使用 Pinia 進行前端狀態管理，作為學習這些技術的起點。此外，使用 Strapi 這個 Headless CMS 儲存帳目與用戶資料，並利用其既有的使用者 Token 機制來實現身份驗證。
- 全站採用 Client-Side Rendering（CSR），以提供類似行動應用的使用體驗，同時簡化狀態管理。
- 使用 Vuelidate 在前端預先驗證登入表單的使用者輸入，提升輸入體驗與錯誤處理效率。

## 主要功能

### 1. 輕鬆記帳
- 快速新增消費記錄
- 支援三種貨幣：TWD、JPY、USD
- 可以為帳目設定「群組」以及「自定義標籤」，以方便分類與搜尋
- 靈活的分帳方式：支援四種分帳模式

### 2. 群組管理
- 建立群組管理共同支出
- 群組內成員可查看所有消費記錄
- 即時顯示群組內的債務狀況

### 3. 個人債務追蹤
- 清楚顯示應收應付金額
- 輕鬆的結算功能
- 可查看與每位朋友的消費記錄

## 特色功能展示
✨ 一鍵開始紀錄帳目

![](https://imgur.com/KZAO7vh.gif)

✨ 快速選擇群組和標籤設定

![](https://imgur.com/Qv067qj.gif)

✨ 四種分帳模式

<div style="display: flex; gap: 10px;">
  <img src="https://imgur.com/eZhrQr9.png" width="25%">
  <img src="https://imgur.com/NaJE2hz.png" width="25%">
  <img src="https://imgur.com/X0cFKKK.png" width="25%">
  <img src="https://imgur.com/Xdt1f9O.png" width="25%">
</div>
</br>

✨ 調整幣值

![](https://imgur.com/LJ9E87x.gif)

✨ 透過標籤或標題搜尋

![](https://imgur.com/0HHldgL.gif)

✨ 一鍵結算與好友的帳目

![](https://imgur.com/HwNSnFJ.gif)
