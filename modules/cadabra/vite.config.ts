import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  cacheDir: "../../../node_modules/.vite/cadabra",
  root: __dirname,
  plugins: [
    react(),
    dts({
      entryRoot: "src",

      copyDtsFiles: true,
      tsconfigPath: "./tsconfig.json",
    }),
  ],

  // Configuration for building the library.
  build: {
    lib: {
      entry: ["src/core/index.ts", "src/react/index.ts", "src/vue/index.ts"],
      name: "cadabra",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
});
