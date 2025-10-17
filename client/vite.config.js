// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const PORT = Number(env.VITE_PORT) || 5173;

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
    server: {
      host: true,
      port: PORT,
      proxy: {
        // Anything starting with /api will be forwarded to your backend
        "/api": {
          target: "http://localhost:3001", // your API
          changeOrigin: true,              // set Host header to target
          secure: false,                   // allow http in dev
          // If your backend is mounted at / (not /api), uncomment the next line:
          // rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
