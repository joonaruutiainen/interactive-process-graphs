import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import styles from 'rollup-plugin-styles';
import babel from '@rollup/plugin-babel';
import bundleSize from 'rollup-plugin-bundle-size';
import svg from 'rollup-plugin-svg';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

export default {
  input: 'src/lib/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      name: 'interactive-process-graphs',
    },
    {
      file: packageJson.module,
      format: 'esm',
      name: 'interactive-process-graphs',
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: ['bundled'],
    }),
    typescript(),
    styles(),
    svg({ base64: true }),
    bundleSize(),
  ],
};
