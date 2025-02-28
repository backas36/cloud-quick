export default {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "feat", // 新功能
                "fix", // 修復 bug
                "docs", // 文檔變更
                "style", // 代碼格式（不影響代碼運行的變動）
                "refactor", // 重構（既不是新增功能，也不是修改 bug 的代碼變動）
                "perf", // 性能優化
                "test", // 增加測試
                "chore", // 構建過程或輔助工具的變動
                "revert", // 回滾
                "build", // 打包
                "ci", // CI 相關變更
            ],
        ],
        "type-case": [2, "always", "lower-case"], // type 必須小寫
        "type-empty": [2, "never"], // type 不能為空
        "subject-empty": [2, "never"], // subject 不能為空
        "subject-full-stop": [2, "never", "."], // subject 結尾不能有句號
        "subject-case": [0], // subject 可以使用任何格式
    },
};
