import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
  },
  optimizeDeps: {
    include: ["h3-js", "maplibre-gl"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          maps: ["maplibre-gl", "react-map-gl"],
          h3: ["h3-js"],
          deck: ["@deck.gl/react", "@deck.gl/layers", "deck.gl"],
        },
      },
    },
    target: "esnext",
    minify: "esbuild",
  },
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
});
