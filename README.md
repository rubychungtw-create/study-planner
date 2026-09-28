# Study Quest｜粉紅學習英雄

把高中讀書計畫做成闖關遊戲的個人化學習網站。從一張粉色週考任務表開始，逐步進化成支援多人帳號、雲端同步、任務分類、專注計時與學習回想的完整工具。

🌐 線上版本：[pink-study-quest-115.sysjusts-2164.chatgpt.site](https://pink-study-quest-115.sysjusts-2164.chatgpt.site/)

## 現在可以做什麼

- 用 Notion 風首頁集中查看今日進度、下一場週考、專注倒數與常用功能
- 首頁每天顯示不同的英文勵志語錄，並可切換 INS 粉紫橘漸層主題
- 設定每週三大優先，以每日微習慣和能量 Check-in 決定最適合的啟動方式
- 把臨時念頭放進腦袋收件匣，之後一鍵轉成正式任務
- 使用 Google 帳號登入，每位玩家保有自己的任務與設定
- 新增、編輯、刪除任務，並拖曳到四象限分類
- 切換粉色、天空藍、紫色、黃橘、蜘蛛人、鋼鐵人主題
- 使用 45 分鐘專注／10 分鐘短休／每四輪 30 分鐘長休的任務計時器
- 放大計時器進入專注模式
- 每輪鎖定一個「本輪唯一目標」
- 把突然想到的事情暫存在「分心停車場」
- 寫下今日重點、心得，並上傳筆記照片
- 把每場週考當成 Boss 關卡，輸入成績後才能確認通關
- 依科目查看成績折線圖與進步幅度
- 依第一次段考範圍，在 9/24～10/6 顯示逐日、逐章節的衝刺關卡
- 用週曆一次查看七天任務，並能直接替指定日期新增或編輯任務
- 養柴犬或貓咪陪讀；升級後餵食成長，並用可用 XP 購買糧食、玩具與家具
- 柴犬與貓咪採角色二選一，同一時間只啟用並顯示一隻陪讀夥伴
- 陪讀寵物常駐畫面角落，隨時替玩家加油
- 緊急且重要的未完成任務會自動帶到隔天，完成續關也會同步完成原任務
- 用「專注、任務、功課、週曆、週考、回想、行程、森林」八個分頁保持畫面清楚
- 用「功課」分頁同步再興高二愛班電子聯絡簿，週末自動延續星期五清單
- 專注森林依月份切換春夏秋冬，12 月會進入聖誕雪夜
- 聯絡簿功課可一鍵加入任務，完成狀態會跨裝置同步
- 自動補救每天最多救 3 關；錯題會依間隔複習節奏重新出現

## 專案結構

```text
dist/                    可直接發布的靜態網站
  index.html             頁面結構與主要介面
  app.js                 任務、登入、同步與計時邏輯
  dashboard.js           首頁、每週優先、微習慣、能量與腦袋收件匣
  dashboard.css          Notion 風版面與響應式側邊導覽
  cloud.css              雲端版樣式與主題
  privacy.html           隱私權政策
  terms.html             服務條款
  assets/                柴犬與貓咪陪讀角色素材
worker/index.mjs         功課唯讀同步 API 與靜態資源入口
supabase-schema-v2.sql   任務編輯資料庫升級
supabase-schema-v3.sql   專注計時器資料庫升級
supabase-schema-v4.sql   回想與筆記照片資料庫升級
supabase-schema-v5.sql   唯一目標與分心停車場資料庫升級
supabase-schema-v6.sql   週考成績與進步曲線資料庫升級
supabase-schema-v7.sql   陪讀寵物、成長與商店雲端存檔
supabase-schema-v8.sql   專注森林雲端存檔
supabase-schema-v9.sql   功課同步、一鍵任務與錯題復活雲端存檔
validate.mjs             發布前基本驗證
EVOLUTION.md             完整版本進化史
```

## 本機檢查

這是零建置步驟的靜態網站；可直接以瀏覽器或本機 HTTP server 開啟 `dist/`。

```bash
node --check dist/app.js
node validate.mjs
```

雲端功能使用 Supabase。資料表與 RLS 權限依序套用各版 `supabase-schema-v*.sql`；Google OAuth 需在自己的 Supabase 與 Google Cloud 專案設定允許的重新導向網址。

## 安全提醒

前端的 Supabase anon key 是設計給瀏覽器使用的公開金鑰，真正的資料隔離由 Row Level Security 保護。請勿把 Supabase `service_role`、GitHub token 或任何私人密碼提交到儲存庫。

## 版本故事

本專案保留從第一版到目前版本的真實 Git commit，而不是把完成品一次上傳。請見 [EVOLUTION.md](EVOLUTION.md) 查看每次進化的原因與成果。

## Contributors

- [@rubychungtw-create](https://github.com/rubychungtw-create) — 專案發起、學習需求與產品方向
- **ChatGPT / OpenAI Codex** — 協作規劃、介面設計、程式實作、測試、部署與文件整理

> Study Quest 是由使用者的真實學習需求出發，與 ChatGPT / OpenAI Codex 共同迭代完成的作品。

