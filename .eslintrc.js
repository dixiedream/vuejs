module.exports = {
  root: true,
  env: {
    es2021: true
  },
  extends: ["plugin:vue/vue3-recommended", "eslint:recommended", "prettier"],
  rules: {
    "vue/html-self-closing": "off",
    "generator-star-spacing": "off",
    "no-console": import.meta.env.PROD ? "warn" : "off",
    "no-debugger": import.meta.env.PROD ? "warn" : "off",
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true,
      },
    },
  ],
};
