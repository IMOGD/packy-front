import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@libs": path.resolve(__dirname, "./src/libs"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
