import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

import { noCommentsPlugin } from "../eslint-rules/no-comments.mjs";

export default tseslint.config(
  {
    ignores: ["dist", "node_modules", "prisma/migrations", "eslint.config.mjs"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.node,
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
      "no-comments": noCommentsPlugin,
    },
    rules: {
      "no-comments/no-comments": "error",
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
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
  prettier,
);
