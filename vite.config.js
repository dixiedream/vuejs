import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

const { NODE_ENV, PUBLIC_PATH } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [vue()],
  base: PUBLIC_PATH ?? "/",
  build: {
    sourcemap: NODE_ENV !== "production",
  },
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
