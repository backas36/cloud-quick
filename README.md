# Cloud-Quick

這是一個使用 Vite、React、TypeScript 和 pnpm 建立的現代化前端專案。

## 技術棧

- **React 19** - 用於構建用戶界面的 JavaScript 庫
- **TypeScript** - JavaScript 的超集，添加了靜態類型定義
- **Vite** - 現代前端構建工具，提供極速的開發體驗
- **pnpm** - 快速、節省磁盤空間的包管理器
- **ESLint** - 代碼檢查工具，遵循 Airbnb 規範
- **Prettier** - 代碼格式化工具
- **Husky** - Git 鉤子工具，用於在 Git 操作前執行腳本
- **Commitlint** - 提交信息檢查工具，確保提交信息符合規範
- **simple-import-sort** - 自動排序導入語句的 ESLint 插件
- **shadcn/ui** - 基於 Tailwind CSS 的高質量 UI 組件庫
- **React Router DOM** - React 應用程序的路由庫
- **Vitest** - 基於 Vite 的測試框架
- **Testing Library** - 用於測試 React 組件的工具庫

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

#### 導入排序

本專案使用 `eslint-plugin-simple-import-sort` 來自動排序導入語句，遵循以下順序：

1. 樣式導入（如 CSS 文件）
2. 第三方庫導入
3. 本地模塊導入

這有助於保持代碼的一致性和可讀性。當運行 `pnpm lint:fix` 時，導入語句會自動按照此順序排序。

### Git 工作流程

本專案使用 Husky 設置了以下 Git 鉤子：

1. **pre-commit**: 在提交前運行以下操作：

    - 檢查並設置 Git 的 core.ignorecase 和 core.autocrlf 為 false
    - 運行 lint-staged 對暫存的文件進行檢查和格式化

2. **commit-msg**: 在提交時檢查提交信息是否符合規範

3. **pre-push**: 在推送代碼前運行構建，確保代碼可以成功構建

### Git 提交規範

本專案使用 Commitlint 來檢查提交信息，確保它們符合 [Conventional Commits](https://www.conventionalcommits.org/) 規範。

提交信息的格式應該如下：

```
<type>(<scope>): <subject>
```

其中 `type` 可以是以下之一：

- **feat**: 新功能
- **fix**: 修復 bug
- **docs**: 文檔變更
- **style**: 代碼格式（不影響代碼運行的變動）
- **refactor**: 重構（既不是新增功能，也不是修改 bug 的代碼變動）
- **perf**: 性能優化
- **test**: 增加測試
- **chore**: 構建過程或輔助工具的變動
- **revert**: 回滾
- **build**: 打包
- **ci**: CI 相關變更

例如：

```
feat(auth): 添加用戶登錄功能
fix(dashboard): 修復數據顯示錯誤的問題
docs: 更新 README 文件
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

## 項目結構

```
cloud-quick/
├── public/             # 靜態資源
├── src/                # 源代碼
│   ├── assets/         # 資源文件（圖片、字體等）
│   ├── App.tsx         # 主應用組件
│   ├── App.css         # 應用樣式
│   ├── main.tsx        # 應用入口點
│   └── index.css       # 全局樣式
├── .husky/             # Git 鉤子配置
├── .lintstagedrc       # lint-staged 配置
├── commitlint.config.js # Commitlint 配置
├── .prettierrc         # Prettier 配置
├── .prettierignore     # Prettier 忽略文件配置
├── eslint.config.js    # ESLint 配置
├── index.html          # HTML 模板
├── tsconfig.json       # TypeScript 配置
├── vite.config.ts      # Vite 配置
└── package.json        # 項目依賴和腳本
```
