import pluginJs from "@eslint/js";
import jest from "eslint-plugin-jest";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist/"] },
  { files: ["src:/**/*.{js,ts,jsx,tsx}", "tests/**/*.{js,ts,jsx,tsx}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["tests/**/*.{js,ts,jsx,tsx}"],
    ...jest.configs["flat/recommended"],
    rules: {
      ...jest.configs["flat/recommended"].rules,
      "jest/prefer-expect-assertions": "off",
    },
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      // "simple-import-sort/imports": "error",
      // "simple-import-sort/exports": "error",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },
  eslintPluginPrettierRecommended,
];

//npx eslint . --fix
