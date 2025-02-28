import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import RootLayout from "../RootLayout";

// 模擬 react-router-dom
vi.mock("react-router-dom", () => ({
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>,
    Outlet: () => <div data-testid='outlet'>Outlet Content</div>,
}));

describe("RootLayout 組件", () => {
    it("應該渲染佈局和導航", () => {
        render(<RootLayout />);

        // 檢查標題是否存在
        expect(screen.getByText("Cloud Quick")).toBeInTheDocument();

        // 檢查導航鏈接是否存在
        expect(screen.getByText("首頁")).toBeInTheDocument();
        expect(screen.getByText("關於")).toBeInTheDocument();

        // 檢查 Outlet 是否被渲染
        expect(screen.getByTestId("outlet")).toBeInTheDocument();

        // 檢查頁腳是否存在
        expect(screen.getByText(/Cloud Quick. 保留所有權利。/)).toBeInTheDocument();

        // 檢查所有鏈接
        const links = screen.getAllByRole("link");
        expect(links).toHaveLength(3);

        // 檢查 Cloud Quick 標題鏈接
        const logoLink = screen.getByText("Cloud Quick").closest("a");
        expect(logoLink).toHaveAttribute("href", "/");

        // 檢查導航鏈接
        const homeLink = screen.getByText("首頁").closest("a");
        expect(homeLink).toHaveAttribute("href", "/");

        const aboutLink = screen.getByText("關於").closest("a");
        expect(aboutLink).toHaveAttribute("href", "/about");
    });
});
