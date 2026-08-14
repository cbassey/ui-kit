import { defineConfig } from "tsup";

const shared = {
  format: ["esm"] as const,
  dts: true,
  sourcemap: true,
  // The build script removes dist/ once up front. Cleaning per entry would
  // let one config delete the other's output.
  clean: false,
  external: ["react", "react-dom", "sonner"],
};

export default defineConfig([
  {
    ...shared,
    entry: { index: "src/index.ts" },
    // Every primitive here is interactive or wraps a Radix client component.
    banner: { js: '"use client";' },
  },
  {
    ...shared,
    entry: { brand: "src/brand/index.ts" },
    // No banner. Brand marks are static SVG with no state, so they render in
    // a server component and ship no JavaScript. Adding "use client" here
    // would pull them into the client bundle for nothing.
  },
]);
