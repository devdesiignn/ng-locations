import { defineConfig } from "tsup";

export default defineConfig({
  format: ["cjs", "esm"],
  entry: ["./src/index.ts"],
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
  target: "es2020",
  sourcemap: true,
  treeshake: true,

  esbuildOptions(options) {
    options.alias = {
      "@": "./src",
    };
  },
});
