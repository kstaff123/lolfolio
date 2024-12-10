import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist", // Output directory for Vite build
  },
  define: {
    'process.env': {}, // Ensure process.env is defined for legacy compatibility
  },
  server: {
    hmr: true,
  },
  resolve: {
    alias: {
      // Example: '@' -> 'src'
      '@': '/src',
    },
  },
});
