//vite.config.ts
/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("@radix-ui")) {
              return "@radix-ui";
            } else if (id.includes("firebase")) {
              if (id.includes("firestore")) {
                return "firestore";
              } else {
                return "firebase";
              }
            } else {
              return "vendor";
            }
          }
        },
      },
    },
  },
  test: {
    include: ["src/__tests__/*/*.test.ts?(x)"],
    globals: true,
    //environment: "jsdom",
  },
});
