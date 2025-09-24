import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import Components from "unplugin-react-components/vite";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    react(),
    Components({
      dts: true,
      dirs: ["src/components"], // racine
      extensions: ["tsx"], // React = .tsx
      deep: true, // sous-dossiers
      directoryAsNamespace: false, // sinon WhoAmI sera sous pages-WhoAmI
      include: [/\.tsx$/],
    }),
    AutoImport({
      dts: "./auto-imports.d.ts",
      include: [/\.[tj]sx?$/],
      imports: ["react"], // auto-import useState, useEffect...
    }),
  ],
});
