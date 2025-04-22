import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    ViteImageOptimizer({
      jpg: {
        quality: 80,
        progressive: true,
      },
      png: {
        quality: 80,
        progressive: true,
      },
      webp: {
        quality: 80,
        lossless: false,
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "ui-components": [
            "@/components/ui/button",
            "@/components/ui/input",
            "@/components/ui/label",
          ],
        },
      },
    },
    assetsInlineLimit: 4096, // 4KB
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    sourcemap: mode === "development",
  },
}));
