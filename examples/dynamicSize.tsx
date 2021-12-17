import React from 'react';
import { ProcessGraph, useWindowDimensions, Edge, Node } from 'interactive-process-graph';

const nodes: Node[] = [
  { id: 0, type: 'pipe' },
  { id: 1, type: 'tank' },
];

const edges: Edge[] = [
  { from: 0, to: 1 },
];

const App: React.FC = () => {
  // Get dynamically updating window dimensions
  const [winWidth, winHeight] = useWindowDimensions();

  return <ProcessGraph
    nodes={nodes}
    edges={edges}
    width={winWidth * 0.8}
    height={winHeight * 0.8}
  />;
};

export default App;
