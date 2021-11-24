/**
 * Loads all .svg images present in folder /src/icons.
 * All the svg files are expected to have a name corresponding to a node type present in the application, e.g. type 'pipe' => 'pipe.svg'.
 *
 * @see https://webpack.js.org/guides/dependency-management/#requirecontext
 */

// eslint-disable-next-line no-undef
const importIcons = (r: __WebpackModuleApi.RequireContext) => {
  const icons: { [key: string]: string } = {};
  r.keys().forEach((item: string) => {
    icons[item.replace('./', '').replace('.svg', '')] = r(item).default;
  });

  return icons;
};

const icons = importIcons(require.context('../icons', false, /\.(svg)$/));

export default icons;
