import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "main.ts",
  output: {
    dir: "dist",
    format: "umd",
    name: "L.TileLayerHeaders",
    globals: {
      leaflet: "L",
    },
  },
  external: ["leaflet"],
  plugins: [typescript()],
});
