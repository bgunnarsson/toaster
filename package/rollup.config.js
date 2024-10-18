import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

const isProduction = process.env.NODE_ENV === 'production'

const commonPlugins = [
  resolve(),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**', // Exclude dependencies from being transpiled
    presets: ['@babel/preset-react'], // Transpile JSX and React code
  }),
  commonjs(), // Must come after Babel for CJS modules
]

const productionPlugins = [
  terser(), // Minifies output in production
]

export default [
  // Main Toaster build (CJS and ESM)
  {
    input: 'src/index.mjs', // Core input
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
    plugins: [...commonPlugins, ...(isProduction ? productionPlugins : [])],
  },

  // React wrapper build (ESM only)
  {
    input: 'src/react/index.js', // Input for the React wrapper
    external: ['react', 'react-dom'], // Mark React and React-DOM as external
    output: {
      file: 'dist/react/index.js', // Output as dist/react/index.js (ESM)
      format: 'esm',
    },
    plugins: [
      ...commonPlugins, // Reuse common plugins
      ...(isProduction ? productionPlugins : []),
    ],
  },
]
