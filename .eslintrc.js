const { NODE_ENV } = process.env;

module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        "plugin:vue/vue3-essential",
        "airbnb-base",
        "airbnb-typescript",
        "plugin:import/typescript",
        "plugin:prettier/recommended",
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        ecmaVersion: "latest",
        parser: "@typescript-eslint/parser",
        sourceType: "module",
        project: "./tsconfig.eslint.json",
        extraFileExtensions: [".vue"],
    },
    plugins: ["vue", "@typescript-eslint", "prettier"],
    rules: {
        "react/jsx-filename-extension": "off",
        "import/no-cycle": [2, { maxDepth: 1 }],
        "import/no-extraneous-dependencies": [
            "error",
            { devDependencies: ["./src/mocks/*"] },
        ],
        "no-underscore-dangle": ["error", { allow: ["_id"] }], // Fix for mongodb _id
        "no-console": NODE_ENV === "production" ? "error" : "off",
        "no-debugger": NODE_ENV === "production" ? "error" : "off",
    },
};
