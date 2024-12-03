import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/lolfolio/",
  server: {
    proxy: {
      "/api": {
        target: "lolfoliobackend-production.up.railway.app", // Your backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
