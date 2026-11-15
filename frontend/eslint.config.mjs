import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

import { noCommentsPlugin } from "../eslint-rules/no-comments.mjs";

const uiImportRestrictions = [
  {
    group: ["@/api", "@/api/*"],
    message: "UI-примитив не должен знать про HTTP. Данные приходят через props.",
  },
  {
    group: ["@/context", "@/context/*"],
    message: "UI-примитив не должен зависеть от контекста приложения.",
  },
  {
    group: ["@/hooks", "@/hooks/*"],
    message: "UI-примитив не должен содержать бизнес-логику. Используй props.",
  },
  {
    group: ["@/pages", "@/pages/*", "@/components/*"],
    message: "UI-примитив не должен импортировать страницы или другие компоненты по alias.",
  },
];

const featureImportRestrictions = [
  {
    group: ["@/api", "@/api/*"],
    message: "Компонент не должен вызывать API напрямую. Используй хук.",
  },
  {
    group: ["@/context", "@/context/*"],
    message: "Компонент не должен читать контекст напрямую. Используй хук.",
  },
  {
    group: ["@/pages", "@/pages/*"],
    message: "Компонент не должен импортировать страницы.",
  },
];

const pageImportRestrictions = [
  {
    group: ["@/api", "@/api/*"],
    message: "Страница не должна вызывать API напрямую. Используй хук.",
  },
  {
    group: ["@/context", "@/context/*"],
    message: "Страница не должна читать контекст напрямую. Используй хук.",
  },
];

const hookImportRestrictions = [
  {
    group: ["@/components", "@/components/*", "@/pages", "@/pages/*"],
    message: "Хук не должен импортировать UI или страницы.",
  },
];

const uiHookImportRestrictions = [
  ...hookImportRestrictions,
  {
    group: ["@/api", "@/api/*"],
    message: "UI-хук не должен вызывать API. Используй бизнес-хук из src/hooks.",
  },
];

const noUiLogic = [
  {
    selector: "CallExpression[callee.name='useState']",
    message: "Локальное состояние UI вынеси в use-* хук рядом с компонентом.",
  },
  {
    selector: "CallExpression[callee.name='useEffect']",
    message: "Эффекты UI вынеси в use-* хук рядом с компонентом.",
  },
  {
    selector: "CallExpression[callee.name='useRef']",
    message: "Работу с ref вынеси в use-* хук рядом с компонентом.",
  },
  {
    selector: "CallExpression[callee.name='fetch']",
    message: "Запросы выполняются только в src/api.",
  },
];

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
      curly: "error",
      eqeqeq: ["error", "always"],
      "no-console": "error",
      "no-else-return": "error",
      "no-implicit-coercion": "error",
      "no-param-reassign": "error",
      "no-return-await": "error",
      "no-var": "error",
      "prefer-const": "error",
      "max-depth": ["error", 4],
      "max-lines": ["error", { max: 260, skipBlankLines: true }],
      "max-params": ["error", 5],
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
    files: ["src/hooks/**/*.ts"],
    rules: {
      "max-lines": ["error", { max: 80, skipBlankLines: true }],
      "max-lines-per-function": ["error", { max: 30, skipBlankLines: true }],
      "max-params": ["error", 3],
      "no-restricted-imports": ["error", { patterns: hookImportRestrictions }],
    },
  },
  {
    files: ["src/components/**/use-*.ts"],
    rules: {
      "max-lines": ["error", { max: 80, skipBlankLines: true }],
      "max-lines-per-function": ["error", { max: 30, skipBlankLines: true }],
      "max-params": ["error", 3],
      "no-restricted-globals": [
        "error",
        {
          name: "fetch",
          message: "UI-хук не выполняет запросы. Вынеси их в бизнес-хук из src/hooks.",
        },
      ],
      "no-restricted-imports": ["error", { patterns: uiHookImportRestrictions }],
    },
  },
  {
    files: ["src/components/**/*.tsx", "src/pages/**/*.tsx"],
    rules: {
      "max-lines": ["error", { max: 180, skipBlankLines: true }],
      "max-lines-per-function": ["error", { max: 130, skipBlankLines: true }],
      "max-params": ["error", 5],
      complexity: ["error", 15],
      "no-restricted-globals": [
        "error",
        {
          name: "fetch",
          message: "Запросы выполняются только в src/api.",
        },
      ],
      "no-restricted-syntax": ["error", ...noUiLogic],
    },
  },
  {
    files: ["src/components/**/*.tsx"],
    rules: {
      "no-restricted-imports": ["error", { patterns: featureImportRestrictions }],
    },
  },
  {
    files: ["src/pages/**/*.tsx"],
    rules: {
      "no-restricted-imports": ["error", { patterns: pageImportRestrictions }],
    },
  },
  {
    files: ["src/components/ui/**/*.tsx"],
    rules: {
      "max-lines": ["error", { max: 120, skipBlankLines: true }],
      "max-lines-per-function": ["error", { max: 90, skipBlankLines: true }],
      "max-params": ["error", 4],
      "no-restricted-imports": ["error", { patterns: uiImportRestrictions }],
    },
  },
  {
    files: ["src/api/**/*.ts", "src/context/**/*.tsx"],
    rules: {
      "max-lines": ["error", { max: 160, skipBlankLines: true }],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/components", "@/components/*", "@/pages", "@/pages/*"],
              message: "Слой данных не должен зависеть от UI.",
            },
          ],
        },
      ],
    },
  },
  prettier,
);
