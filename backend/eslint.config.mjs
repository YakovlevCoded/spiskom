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
      curly: "error",
      eqeqeq: ["error", "always"],
      "no-else-return": "error",
      "no-implicit-coercion": "error",
      "no-param-reassign": "error",
      "no-return-await": "error",
      "no-var": "error",
      "prefer-const": "error",
      "max-depth": ["error", 4],
      "max-lines": ["error", { max: 260, skipBlankLines: true }],
      "max-lines-per-function": ["error", { max: 100, skipBlankLines: true }],
      "max-params": ["error", 4],
      "max-nested-callbacks": ["error", 4],
      complexity: ["error", 12],
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
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
    files: ["src/modules/*/*.routes.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@prisma/client", "**/lib/prisma"],
              message: "Маршруты не работают с Prisma. Вынеси запросы в service.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/modules/*/*.service.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["express", "**/middleware/*", "**/*.routes"],
              message: "Service не должен знать про HTTP. Только бизнес-логика и Prisma.",
            },
          ],
        },
      ],
    },
  },
  prettier,
);
