import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

import { noCommentsPlugin } from "../eslint-rules/no-comments.mjs";

export default tseslint.config(
  {
    ignores: ["dist", "node_modules", "eslint.config.mjs"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.browser,
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
      "react-hooks": reactHooks,
      "no-comments": noCommentsPlugin,
    },
    rules: {
      "no-comments/no-comments": "error",
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["src/hooks/**/*.ts"],
    rules: {
      "max-lines-per-function": ["error", { max: 30, skipBlankLines: true }],
    },
  },
  prettier,
);
