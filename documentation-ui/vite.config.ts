import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/SemEval-2026/' : '/',
  build: {
    sourcemap: true,           // 👈 add this
  },
  // ---------- server settings ----------
  server: {
    host: "::",
    port: 3000,
    proxy: {
      "/api": "http://localhost:8000",
      "/docs": {
        target: "http://localhost:8000",
        changeOrigin: true,
        cookieDomainRewrite: "localhost",   // strips the original cookie domain
        cookiePathRewrite: { "/": "/" },    // keeps paths sane
      },
    }
  },

  plugins: [
    react(),
    mode === "development" && componentTagger()
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
}));
