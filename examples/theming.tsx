import React from 'react';
import { ProcessGraph, DefaultTheme, Edge, Node } from 'interactive-process-graph';

const myTheme: DefaultTheme = {
  // Standard CSS border radius for nodes
  borderRadius: 8,

  // Font family for all graph texts
  fontFamily: 'Helvetica',

  // Color palettes
  palette: {

    // Common colors
    common: {
      black: '#030303',
      white: '#f3f3f3',
    },

    // Primary color, used for things like buttons and nodes
    primary: {
      main: '#aa0000',
      text: '#f3f3f3',
    },

    // Secondary color, used mainly for edges between nodes
    secondary: {
      main: '#880000',
      text: '#f3f3f3',
    },

    // Background color for the canvas
    background: {
      main: '#330000',
      text: '#f3f3f3',
    },
  },
};

const nodes: Node[] = [
  { id: 0, type: 'pipe' },
  { id: 1, type: 'tank' },
];

const edges: Edge[] = [
  { from: 0, to: 1 },
];

const App: React.FC = () => {
  return <ProcessGraph
    nodes={nodes}
    edges={edges}
    width={640}
    height={480}
    theme={myTheme}
  />;
};

export default App;
