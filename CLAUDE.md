# 專案：台灣報價單產生器
- 技術：Next.js（App Router）、TypeScript、Tailwind CSS
- 不使用資料庫、不需登入，資料存在 localStorage
- PDF 使用瀏覽器原生列印（window.print + @media print），不引入 PDF 套件
- 介面全部使用繁體中文，金額使用新台幣、千分位格式
- 必須支援手機版面
- 計算邏輯（稅額、國字大寫、統編驗證）放在 lib/ 下的純函式，並附上單元測試
- 使用 git 管理版本，每完成一個功能就 commit 並 push
