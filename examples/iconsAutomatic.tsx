import React from 'react';
import { ProcessGraph, importIcons, IconMap, Edge, Node } from 'interactive-process-graph';

// Automatically import all .svg icons from C:/Custom/Icons directory
const icons: IconMap = importIcons(require.context('C:/Custom/Icons', false, /\.(svg)$/));

const nodes: Node[] = [
  // The icon filenames should match your node types, e.g. 'myNodeType.svg'
  { id: 0, type: 'myNodeType' },
  { id: 1, type: 'anotherNodeType' },
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
    icons={icons}
  />;
};

export default App;
