import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import About from "../About";

// 模擬 react-router-dom
vi.mock("react-router-dom", () => ({
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
        <a href={to} data-testid='link'>
            {children}
        </a>
    ),
}));

describe("About 組件", () => {
    it("應該渲染標題和內容", () => {
        render(<About />);

        // 檢查標題是否存在
        expect(screen.getByText("關於我們")).toBeInTheDocument();

        // 檢查內容是否存在
        expect(
            screen.getByText("Cloud Quick 是一個現代化的前端專案，使用 Vite、React、TypeScript 和 pnpm 構建。")
        ).toBeInTheDocument();

        expect(screen.getByText("我們使用了 shadcn/ui 來提供美觀且功能豐富的 UI 組件。")).toBeInTheDocument();

        // 檢查返回首頁按鈕是否存在
        expect(screen.getByText("返回首頁")).toBeInTheDocument();
        expect(screen.getByTestId("link")).toHaveAttribute("href", "/");
    });
});
