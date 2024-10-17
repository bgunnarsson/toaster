import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import { terser } from '@rollup/plugin-terser'

export default {
  input: 'src/index.mjs', // Your input file
  output: [
    {
      file: 'dist/toaster.cjs.js', // CommonJS output
      format: 'cjs',
      exports: 'auto', // Automatically export default or named exports
    },
    {
      file: 'dist/toaster.esm.js', // ESM output
      format: 'esm',
    },
  ],
  plugins: [
    resolve(), // Resolves node_modules
    commonjs(), // Converts CommonJS modules to ES6
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**', // Only transpile our source code
    }),
    terser(), // Minifies the output
  ],
}
