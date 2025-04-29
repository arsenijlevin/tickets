import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "pages/index/index.html"),
        order: resolve(__dirname, "pages/order/order.html"),
        films: resolve(__dirname, "pages/films/films.html"),
      },
      output: {
        entryFileNames: ({ name }) => `pages/${name}/[name].js`,
        chunkFileNames: ({ name }) => `pages/${name}/[name].js`,
        assetFileNames: (assetInfo) => {
          const originalFileNames = assetInfo.originalFileNames[0];

          // remove all after last slash
          const name = originalFileNames?.split("/").slice(0, -1).join("/");

          return `${name}/[name][extname]`;
        },
      },
    },
    outDir: "dist",
    emptyOutDir: true,
    modulePreload: {
      polyfill: false,
    },
    minify: false,
    cssMinify: false,
  },
  base: "/tickets/dist/",
});
