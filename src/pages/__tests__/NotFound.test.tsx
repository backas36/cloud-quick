import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import NotFound from "../NotFound";

// 模擬 react-router-dom
vi.mock("react-router-dom", () => ({
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
        <a href={to} data-testid='link'>
            {children}
        </a>
    ),
}));

describe("NotFound 組件", () => {
    it("應該渲染 404 頁面", () => {
        render(<NotFound />);

        // 檢查標題是否存在
        expect(screen.getByText("404 - 頁面未找到")).toBeInTheDocument();

        // 檢查內容是否存在
        expect(screen.getByText("您訪問的頁面不存在或已被移除。")).toBeInTheDocument();

        // 檢查返回首頁按鈕是否存在
        expect(screen.getByText("返回首頁")).toBeInTheDocument();
        expect(screen.getByTestId("link")).toHaveAttribute("href", "/");
    });
});
