import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "../Home";

describe("Home 組件", () => {
    it("應該渲染標題和按鈕", () => {
        render(<Home />);

        // 檢查標題是否存在
        expect(screen.getByText("Cloud Quick")).toBeInTheDocument();

        // 檢查歡迎文字是否存在
        expect(screen.getByText("歡迎使用 Cloud Quick 應用")).toBeInTheDocument();
    });
});
