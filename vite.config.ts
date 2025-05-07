import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  test: {
    globals: true,
    reporters: [`verbose`],
    environment: "jsdom",
    setupFiles: ["src/setupTests.ts"],
    coverage: {
      reportsDirectory: "./coverage",
      exclude: ["src/main.tsx", "src/vite-env.d.ts", "vite.config.ts"],
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["**/*.ts", "**/*.tsx"],
    },
  },
  plugins: [react()],
});
