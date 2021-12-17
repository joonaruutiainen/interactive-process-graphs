import { IconMap } from '../types/IconMap';
/**
 * ImportIcons
 *
 * @description Imports all images of given type (preferably svg) present in provided folder(s).
 * The files are expected to have a name corresponding to a node type present in the application, e.g. a node has type 'pipe' => 'pipe.svg'.
 * If using TypeScript, run "npm i -D @types/webpack-env" to install typing
 * @param r Webpack require.context with desired args.
 * @example
 * const icons = importIcons(require.context('../icons', false, /\.(svg)$/));
 * @returns IconMap
 * @see https://webpack.js.org/guides/dependency-management/#requirecontext
 */
// eslint-disable-next-line no-undef
const importIcons = (r: __WebpackModuleApi.RequireContext): IconMap => {
  const icons: IconMap = {};
  r.keys().forEach((item: string) => {
    icons[item.replace('./', '').replace('.svg', '')] = r(item).default;
  });

  return icons;
};

export default importIcons;
