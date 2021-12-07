[![CI/CD](https://github.com/joonaruutiainen/interactive-process-graphs/actions/workflows/cicd.yml/badge.svg?branch=main)](https://github.com/joonaruutiainen/interactive-process-graphs/actions/workflows/cicd.yml) ![License](https://img.shields.io/github/license/joonaruutiainen/interactive-process-graphs) [![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=joonaruutiainen_interactive-process-graphs)](https://sonarcloud.io/dashboard?id=joonaruutiainen_interactive-process-graphs)

# Interactive process graphs with React

This project is part of the "Software Engineering Project" -course at Tampere University. The goal of the project is to produce a React component package for drawing interactive process graphs for visualizing data structures that represent industrial production processes. The project topic was given by Elomatic Oy as part of development of a process traceability program for industrial uses.

## Getting started

1.  Clone this repository
2.  Run `npm install --legacy-peer-deps` to install dependencies
3.  Run `npm start` to start the application in development mode

## VSCode Plugins

-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - `dbaeumer.vscode-eslint`
-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - `esbenp.prettier-vscode`

## Theming

Custom theme can be provided for the `ProcessGraph` component via the `theme` prop.
Light theme is used as default but this package includes a dark theme as well.
Primary color is for the background of the buttons and nodes,
secondary color is for the edges,
and backgorund color is for the background of the canvas.

```json
{
  "borderRadius": 7,
  "fontFamily": "Helvetica",
  "palette": {
    "common": {
      "black": "#000000",
      "white": "#ffffff",
    },
    "primary": {
      "main": "#ffffff",
      "text": "#000000",
    },
    "secondary": {
      "main": "#dfe4e7",
      "text": "#ffffff",
    },
    "background": {
      "main": "#bfbfbf",
      "text": "#000000",
    },
  },
}
```
