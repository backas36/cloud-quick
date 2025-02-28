# Cloud-Quick

這是一個使用 Vite、React、TypeScript 和 pnpm 建立的現代化前端專案。

## 技術棧

- **React 19** - 用於構建用戶界面的 JavaScript 庫
- **TypeScript** - JavaScript 的超集，添加了靜態類型定義
- **Vite** - 現代前端構建工具，提供極速的開發體驗
- **pnpm** - 快速、節省磁盤空間的包管理器

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

### 構建

構建生產版本：

```bash
pnpm build
```

預覽生產構建：

```bash
pnpm preview
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
├── index.html          # HTML 模板
├── tsconfig.json       # TypeScript 配置
├── vite.config.ts      # Vite 配置
└── package.json        # 項目依賴和腳本
```

## 擴展 ESLint 配置

如果您正在開發生產應用，我們建議更新配置以啟用類型感知的 lint 規則。詳情請參閱 Vite 官方文檔。

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
