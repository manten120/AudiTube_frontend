// eslint-disable-next-line import/no-commonjs
module.exports = {
  extends: ["next/core-web-vitals", "prettier"],
  plugins: ["unused-imports", "prefer-arrow-functions"],
  rules: {
    "import/no-commonjs": "error", // require, module.exportを禁止してimport, export に統一する。https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-commonjs.md
    "import/prefer-default-export": "off", // 名前付きエクスポートを許可する
    "import/no-default-export": "error", // defaultエクスポートを禁止する

    "no-shadow": "error", // https://eslint.org/docs/rules/no-shadow

    "@typescript-eslint/no-unused-vars": "off", // eslint-plugin-unused-importsを使うために必要な設定 https://www.npmjs.com/package/eslint-plugin-unused-imports
    "unused-imports/no-unused-imports": "error", // eslint-plugin-unused-imports 未使用のimportを禁止する
    "unused-imports/no-unused-vars": "error", // eslint-plugin-unused-imports 未使用の変数を禁止する

    "prefer-arrow-functions/prefer-arrow-functions": [
      // 関数をアロー関数に統一する。参考: https://www.npmjs.com/package/eslint-plugin-prefer-arrow-functions
      "error",
      {
        classPropertiesAllowed: true,
        disallowPrototype: true,
        returnStyle: "implicit",
        singleReturnOnly: false,
      },
    ],
  },
  overrides: [
    // pagesディレクトリでは default export を許可する
    // https://blog.popweb.dev/programming/javascript/eslint-overrides/
    // https://www.reddit.com/r/nextjs/comments/ldco5h/eslint_nodefaultexport_except_in_pages_directory/
    {
      files: ["./src/pages/**"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
