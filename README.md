# Interactive process graphs with React
[![CI/CD](https://github.com/joonaruutiainen/interactive-process-graphs/actions/workflows/cicd.yml/badge.svg?branch=main)](https://github.com/joonaruutiainen/interactive-process-graphs/actions/workflows/cicd.yml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=joonaruutiainen_interactive-process-graphs&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=joonaruutiainen_interactive-process-graphs) [![License](https://img.shields.io/github/license/joonaruutiainen/interactive-process-graphs)](https://github.com/joonaruutiainen/interactive-process-graphs/blob/main/LICENSE) [![npm](https://img.shields.io/npm/v/interactive-process-graphs)](https://www.npmjs.com/package/interactive-process-graphs) [![Repository](https://img.shields.io/badge/GitHub-Repository-lightgrey?style=flat&logo=github)](https://github.com/joonaruutiainen/interactive-process-graphs) 

This project was done as part of the "Software Engineering Project" -course at Tampere University (autumn 2021). The goal of the project was to produce a React component package for drawing interactive process graphs for visualizing data structures that represent industrial production processes. The project topic was given by Elomatic Oy as part of development of a process traceability program for industrial uses.

## Getting started

Run `npm install interactive-process-graphs` to install the package via NPM.

Then provide your nodes and edges for the `ProcessGraph` component:

```ts
import { ProcessGraph } from 'interactive-process-graphs';

const MyApp = () => {
  return <ProcessGraph
    nodes={[{ id: 0, type: 'pipe' }, { id: 1, type: 'tank' }]}
    edges={[{ from: 0, to: 1 }]}
    width={666}
    height={420}
  >;
};
```

See the `examples` directory for examples of theming, custom icons, custom tools for the toolbar, and more.

## Development

1.  Clone this repository
2.  Run `npm install --legacy-peer-deps` to install dependencies
3.  Run `npm start` to start the test application in development mode

### VSCode Plugins

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - `dbaeumer.vscode-eslint`
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - `esbenp.prettier-vscode`

### Packaging

The distributable is created with Babel and Rollup and published to NPM.
How to create a new release:

1. Bump version number in `package.json`
2. `npm run build`
3. `npm publish`

## Theming

A custom theme can be provided for the `ProcessGraph` component via the `theme` prop.
Light theme is used as default but this package includes a dark theme as well.
Changing theme at runtime is currently **not** supported.
The `theme` prop should be of the following format:

```json
{
  "borderRadius": 7,
  "fontFamily": "Helvetica",
  "palette": {
    "common": {
      "black": "#000000",
      "white": "#ffffff"
    },
    "primary": {
      "main": "#ffffff",
      "text": "#000000"
    },
    "secondary": {
      "main": "#dfe4e7",
      "text": "#ffffff"
    },
    "background": {
      "main": "#bfbfbf",
      "text": "#000000"
    }
  }
}
```

Where:

- The primary color is for the background of the buttons and nodes,
- the secondary color is for the edges,
- and the background color is for the background of the canvas.

## Icons

Icons for node types can be provided as a prop to `ProcessGraph`. ProcessGraph expects icons that are already imported, as a object of type `IconMap`(`[key: string]: string;`). The key should correspond with types present in the application and value should be an url of an imported icon, e.g. `pipe: "/static/media/pipe.842fbf6a.svg"`. If a matching icon is not found, no icon is used. Some default icons are provided with the package.

Default icons provided with the package:

> axe, cooling_tank, cut, drill, filter, hammer, input, measurement, mix_tank, mortar, paint, pipe, pliers, pump, reactor, saw, screw_feeder, screw, tank, transport, wrench

Helper function `iconImporter` is provided for easily importing all the icons inside a given folder, using Webpack's [require.context](https://webpack.js.org/guides/dependency-management/#requirecontext).
