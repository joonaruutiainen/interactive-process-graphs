import React from 'react';
import { ProcessGraph, useWindowDimensions, Edge, Node, lightTheme } from 'interactive-process-graphs';

const nodes: Node[] = [
  { id: 0, type: 'pipe' },
  { id: 1, type: 'tank' },
];

const edges: Edge[] = [
  { from: 0, to: 1 },
];

const App: React.FC = () => {
  // Get dynamically updating window dimensions
  const { width, height } = useWindowDimensions();

  return (
    // ProcessGraph should be wrapped in a flex box for it to correctly size itself
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
      <ProcessGraph
        nodes={nodes}
        edges={edges}
        width={width * 0.8}
        height={height * 0.8}
        theme={lightTheme}
      />
    </div>
  )
};

export default App;
