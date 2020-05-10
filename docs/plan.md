## 上線計畫書

(假想這個專案應要正式上線，我們會問這些問題)

- 我們要還需要經過哪些測試，才可以正式上線?
  - JS, CSS上CDN
  - CSS 自動引入流程
  - 廣告css可客製化
  - 盡可能測試不同的browser環境(over 90%)

- 有什麼方式可以搜集在使用者瀏覽器上遇到的錯誤? 
  - data面的error log => call log API
  - UI面的可能比較困難 (有error msg也是直接call log API)
    - 詢問硬體, browser環境
    - 詢問操作流程
    - 用該硬體，環境及操作流程重現該UI錯誤

global catch
```js
  window.onerror = function (msg, url, lineNo, columnNo, error) {
    // handle error, send message to log API
  }
```
error handler in SDK，發生錯誤的話一樣call log API