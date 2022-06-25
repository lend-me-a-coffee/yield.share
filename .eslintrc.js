module.exports = {
    root: true,
    env: {
      es6: true,
      node: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript",
      "plugin:@typescript-eslint/recommended",
    ],
    ignorePatterns: [
      "/dist/**/*", // Ignore built files.
      "/client/**/*"
    ],
    plugins: [
      "@typescript-eslint",
      "import",
    ],
    rules: {
      "quotes": ["error", "double"],
      "import/no-unresolved": 0,
      "camelcase": 0,
    },
  };
