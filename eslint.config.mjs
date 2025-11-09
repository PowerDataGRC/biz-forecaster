import nextPlugin from "@next/eslint-plugin-next";
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import globals from 'globals';

// const eslintConfig = tseslint.config(
//   {
//     files: ["**/*.ts", "**/*.tsx"],
//     extends: [
//       ...tseslint.configs.recommended,
//     ],
//     plugins: {
//       "@next/next": nextPlugin,
//     },
//     rules: {
//       ...nextPlugin.configs.recommended.rules,
//       ...nextPlugin.configs["core-web-vitals"].rules,
//     },
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//         ...globals.node,
//       },
//     },
//   },
//   {
//     ignores: [
//       "node_modules/**",
//       ".next/**",
//       "out/**",
//       "build/**",
//       "next-env.d.ts",
//     ],
//   },
// );

// export default eslintConfig;

export default defineConfig([
  // Frontend
  tseslint.config(
    {
      files: ['biz-forecaster-frontend/**/*.{ts,tsx}'],
      plugins: {
        '@next/next': nextPlugin,
      },
      rules: {
        ...nextPlugin.configs.recommended.rules,
        ...nextPlugin.configs['core-web-vitals'].rules,
      },
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.node,
        },
      },
    },
    {
      ignores: ['**/node_modules/**', '**/.next/**', '**/build/**'],
    }
  ),

  // Backend
  tseslint.config(
    {
      files: ['biz-forecaster-api/**/*.{ts,js}'],
      rules: {
        // Add backend-specific rules here
      },
      languageOptions: {
        globals: {
          ...globals.node,
        },
      },
    },
    {
      ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'],
    }
  ),
]);