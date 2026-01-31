import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const isLibMode = mode === "lib";

  return {
    plugins: [
      react(),
      tailwindcss(),
      isLibMode &&
        dts({
          insertTypesEntry: true,
          include: ["src"],
          exclude: ["src/main.tsx", "src/App.tsx", "src/assets/**/*"],
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    build: isLibMode
      ? {
          lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "CreditCardUI",
            formats: ["es", "umd"],
            fileName: "credit-card-ui",
          },
          rollupOptions: {
            external: ["react", "react-dom", "react/jsx-runtime"],
            output: {
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
                "react/jsx-runtime": "jsxRuntime",
              },
              // Don't include asset hashes for cleaner output
              assetFileNames: "[name][extname]",
            },
          },
          cssCodeSplit: false,
          // Don't copy public folder to dist
          copyPublicDir: false,
          // Minify for smaller bundle
          minify: "esbuild",
          // Target modern browsers for smaller output
          target: "es2020",
        }
      : {},
  };
});
