# Cloud-Quick

這是一個基於 React 19 的現代化雲端檔案上傳快速應用，使用 Vite、TypeScript 和 TailwindCSS 構建的高效能前端專案。

## 核心功能

- **檔案上傳** - 支援多種檔案類型的上傳功能
- **拖曳上傳** - 直覺的拖放檔案上傳界面
- **上傳狀態追蹤** - 即時顯示檔案上傳進度和狀態
- **檔案類型驗證** - 自動驗證檔案類型和大小
- **響應式設計** - 適應各種裝置螢幕大小

## 技術棧

- **React 19** - 最新版本的 React 庫，用於構建高效的使用者界面
- **TypeScript** - 具有靜態類型檢查的 JavaScript 超集
- **Vite** - 現代前端構建工具，提供極速的開發體驗
- **TailwindCSS 4** - 功能強大的 utility-first CSS 框架
- **shadcn/ui** - 基於 Tailwind CSS 的高品質 UI 組件庫
- **Radix UI** - 無樣式、可訪問性強的 UI 原件
- **React Router DOM 7** - React 應用的最新路由解決方案
- **React Hook Form** - 高效的表單處理和驗證方案
- **Sonner** - 現代化的 toast 通知組件
- **pnpm** - 快速、節省磁盤空間的包管理器
- **Vitest** - 基於 Vite 的高效測試框架
- **Testing Library** - 用於測試 React 組件的工具庫
- **ESLint** - 代碼檢查工具，採用 Airbnb 規範
- **Prettier** - 代碼格式化工具

## 專案架構

本專案採用基於功能的模組化架構，遵循最佳實踐和設計模式：

```
src/
├── assets/             # 靜態資源（圖片、字體等）
├── components/         # 共用組件
│   ├── ui/             # 基礎 UI 組件 (shadcn/ui)
│   └── layout/         # 布局相關組件
├── features/           # 功能模組
│   └── upload/         # 上傳功能模組
│       ├── components/ # 上傳相關組件
│       ├── context/    # 上傳相關上下文
│       ├── hooks/      # 上傳相關自定義 hooks
│       ├── types/      # 上傳相關類型定義
│       ├── utils/      # 上傳相關工具函數
│       └── __tests__/  # 上傳功能測試
├── hooks/              # 全局自定義 hooks
├── lib/                # 第三方庫整合
├── pages/              # 頁面組件
│   ├── Guide.tsx       # 上傳指南頁面
│   ├── Home.tsx        # 首頁
│   ├── NotFound.tsx    # 404 頁面
│   └── Upload.tsx      # 檔案上傳頁面
├── types/              # 全局類型定義
└── test/               # 測試工具和配置
```

### 主要功能模組

#### 上傳功能 (features/upload)

- **DropZone** - 支援拖放檔案上傳的組件
- **FileList** - 顯示已選擇檔案的列表
- **FileUploadGuide** - 上傳指南和說明
- **UploadSection** - 整合上傳相關功能的主要組件

#### 檔案處理機制

- 支援多種檔案類型驗證
- 檔案大小限制檢查
- 自動產生檔案預覽
- 檔案上傳進度追蹤
- 錯誤處理和狀態管理

## 開始使用

### 前提條件

- Node.js 20.5.1 或更高版本
- pnpm 8.6.2 或更高版本

### 安裝

1. 克隆此倉庫

```bash
git clone <repository-url>
cd cloud-quick
```

2. 安裝依賴

```bash
pnpm install
```

### 開發

啟動開發服務器：

```bash
pnpm dev
```

應用將在 http://localhost:5173 運行。

### 代碼檢查和格式化

運行 ESLint 檢查代碼：

```bash
pnpm lint
```

自動修復 ESLint 問題：

```bash
pnpm lint:fix
```

使用 Prettier 格式化代碼：

```bash
pnpm format
```

### 構建

構建生產版本：

```bash
pnpm build
```

預覽生產構建：

```bash
pnpm preview
```

### 測試

運行單元測試：

```bash
pnpm test
```

以監視模式運行測試：

```bash
pnpm test:watch
```

生成測試覆蓋率報告：

```bash
pnpm test:coverage
```

## Git 工作流程與提交規範

本專案使用 Husky、Commitlint 和 lint-staged 來維護代碼質量和一致性。

### Git 鉤子

- **pre-commit**: 運行 lint-staged 對暫存的文件進行檢查和格式化
- **commit-msg**: 檢查提交信息是否符合 Conventional Commits 規範
- **pre-push**: 在推送前運行構建和測試

### 提交信息格式

```
<type>(<scope>): <subject>
```

類型 (type) 包括：

- **feat**: 新功能
- **fix**: 修復 bug
- **docs**: 文檔變更
- **style**: 代碼格式（不影響代碼運行的變動）
- **refactor**: 重構
- **perf**: 性能優化
- **test**: 增加測試
- **chore**: 構建過程或輔助工具的變動

範例：

```
feat(upload): 添加檔案預覽功能
fix(auth): 修復登入失敗的問題
docs: 更新安裝說明
```

## 設計理念

本專案遵循以下設計原則：

- **組件化設計** - 將 UI 拆分為可重用的小型組件
- **關注點分離** - 將邏輯、UI 和樣式分離
- **功能模組化** - 按功能而非類型組織代碼
- **可測試性** - 編寫易於測試的代碼
- **可訪問性** - 確保應用對所有用戶可用
- **性能優化** - 使用 React 的最佳實踐，如記憶化和代碼分割

## 路線圖

- [ ] 用戶認證系統
- [ ] 檔案管理功能
- [ ] 檔案分享功能
- [ ] 進階檔案處理選項
- [ ] 深色模式支援

## 貢獻指南

歡迎貢獻到這個專案！請確保遵循以下步驟：

1. Fork 這個倉庫
2. 創建你的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟一個 Pull Request

## 許可證

本專案採用 MIT 許可證 - 查看 [LICENSE](LICENSE) 文件了解詳情。
