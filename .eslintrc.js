const { NODE_ENV } = process.env;

module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  extends: ["plugin:vue/vue3-recommended", "eslint:recommended", "prettier"],
  rules: {
    "vue/html-self-closing": "off",
    "generator-star-spacing": "off",
    "no-console": NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": NODE_ENV === "production" ? "warn" : "off",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
