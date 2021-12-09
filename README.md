[![CI/CD](https://github.com/joonaruutiainen/interactive-process-graphs/actions/workflows/cicd.yml/badge.svg?branch=main)](https://github.com/joonaruutiainen/interactive-process-graphs/actions/workflows/cicd.yml) ![License](https://img.shields.io/github/license/joonaruutiainen/interactive-process-graphs) [![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=joonaruutiainen_interactive-process-graphs)](https://sonarcloud.io/dashboard?id=joonaruutiainen_interactive-process-graphs)

# Interactive process graphs with React

This project is part of the "Software Engineering Project" -course at Tampere University. The goal of the project is to produce a React component package for drawing interactive process graphs for visualizing data structures that represent industrial production processes. The project topic was given by Elomatic Oy as part of development of a process traceability program for industrial uses.

## Getting started

1.  Clone this repository
2.  Run `npm install --legacy-peer-deps` to install dependencies
3.  Run `npm start` to start the application in development mode

## VSCode Plugins

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - `dbaeumer.vscode-eslint`
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - `esbenp.prettier-vscode`

## Icons

Icons for node types can be provided as a prop to `ProcessGraph`. ProcessGraph expects icons that are already imported, as a object of type `IconMap`(`[key: string]: string;`). The key should correspond with types present in the application and value should be an url of an imported icon, e.g. `pipe: "/static/media/pipe.842fbf6a.svg"`. If a matching icon is not found, no icon is used. Some default icons are provided with the package.

Helper function `iconImporter` is provided for easily importing all the icons inside a given folder, using Webpack's [require.context](https://webpack.js.org/guides/dependency-management/#requirecontext).
