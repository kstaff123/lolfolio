import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/lolfolio/",
  define: {
    'process.env': {}, // Ensure process.env is defined for legacy compatibility
  },
  server: {
    proxy: {
      '/api': {
        target: proccess.env.VITE_API_BASE_URL,
        changeOrigin: true,
      },
    },
  },
});
