import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

// Common plugins shared across both builds
const commonPlugins = [
  resolve(),
  commonjs(),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
  }),
  terser(), // Minifies the output
]

export default [
  // Main Toaster build (CJS and ESM)
  {
    input: 'src/index.mjs', // Your input file for the main Toaster class
    output: [
      {
        file: 'dist/toaster.cjs.js', // CommonJS output
        format: 'cjs',
        exports: 'auto',
      },
      {
        file: 'dist/toaster.esm.js', // ESM output
        format: 'esm',
      },
    ],
    plugins: [...commonPlugins],
  },

  // React wrapper build (ESM only)
  {
    input: 'src/react/index.js', // Input for the React wrapper
    external: ['react', 'react-dom'], // Mark these as external dependencies
    output: {
      file: 'dist/react/index.js', // Output as dist/react/index.js (ESM)
      format: 'esm',
    },
    plugins: [
      ...commonPlugins, // Reuse common plugins
    ],
  },
]
