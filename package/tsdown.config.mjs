import { defineConfig } from 'tsdown/config'

export default defineConfig({
  entry: { index: 'index.mjs', react: 'react.mjs' },
  format: 'esm',
  outDir: 'dist',
  platform: 'browser',
  target: 'es2020',
  clean: true,
  hash: false,
  sourcemap: false,
  // Declarations are emitted by `tsc` after this build (see the `types` script).
  // tsdown's TypeScript 7 (tsgo) dts path emits a facade .d.ts that imports its
  // types from a .js chunk, which would leave consumers with no types at all.
  dts: false,
  // react is a peer dependency and stays external, as it did under rollup.
  outExtensions: () => ({ js: '.esm.js' }),
})
