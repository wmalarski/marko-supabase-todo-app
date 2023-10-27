import marko from "@marko/run/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [marko()],
  build: {
    sourcemap: true, // Generate sourcemaps for all builds.
    emptyOutDir: false, // Avoid server & client deleting files from each other.
  },
});
