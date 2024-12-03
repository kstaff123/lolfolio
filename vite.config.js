import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/lolfolio/", // Your GitHub Pages base path
  server: {
    proxy: {
      '/api': {
        target: meta.env.VITE_API_BASE_URL, // Correct way to access Vite env variables
        changeOrigin: true,
      },
    },
  },
});
