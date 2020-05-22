module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
  },
  env: {
    browser: true,
  },
  extends: ["eslint:recommended", "plugin:vue/recommended"],
  // plugins: ["vue"],
  // add your custom rules here
  rules: {
    "vue/html-self-closing": "off",
    "generator-star-spacing": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
};
