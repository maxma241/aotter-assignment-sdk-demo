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

## 其它問題

廣告API只會回傳一筆ad嗎? 會不會回傳array的情況? 然後可能廣告UI會顯示carousel之類的UI style?

有想到一些features:
- css style客製化
- use `data-*` attributes 來做ad tracker之類的
- 原本想在底層create一個event bus來dispatch event，後來又想說模仿vue那樣的config好像比較直覺!?

about e2e testing
用PC(windows)使用WSL環境開發，E2E testing遇到WSL開不起來的情況，一周而已，沒時間handle惹QQ

