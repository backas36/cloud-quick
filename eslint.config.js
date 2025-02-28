import js from "@eslint/js";
import airbnb from "eslint-config-airbnb";
import airbnbTs from "eslint-config-airbnb-typescript";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import pluginPrettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    { ignores: ["dist"] },
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            react,
            "jsx-a11y": jsxA11y,
            import: importPlugin,
            prettier: pluginPrettier,
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            "import/extensions": "off",
            "import/first": "error",
            "import/newline-after-import": "error",
            "import/no-duplicates": "error",
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "react/jsx-filename-extension": [1, { extensions: [".jsx", ".tsx"] }],
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react/require-default-props": "off",
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            "prettier/prettier": [
                "error",
                {
                    singleQuote: false,
                    tabWidth: 4,
                    semi: true,
                    useTabs: false,
                    jsxSingleQuote: true,
                    trailingComma: "es5",
                    bracketSpacing: true,
                    arrowParens: "always",
                    printWidth: 120,
                },
            ],
        },
    },
    {
        files: ["**/*.{ts,tsx}"],
        extends: [...tseslint.configs.recommended],
        rules: {
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
        },
    }
);
