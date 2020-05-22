module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
  },
  env: {
    browser: true,
  },
  extends: ["eslint:recommended", "plugin:vue/recommended"],
  rules: {
    "vue/html-self-closing": "off",
    "generator-star-spacing": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
};
