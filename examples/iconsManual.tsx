import React from 'react';
import { ProcessGraph, IconMap, Edge, Node } from 'interactive-process-graph';

// Import custom icons manually
import { MyCustomIcon, AnotherIcon } from 'my-custom-icons';

// Create an IconMap with node types as keys and custom icons as values
const icons: IconMap = {
  'myNodeType': MyCustomIcon,
  'anotherNodeType': AnotherIcon,
};

const nodes: Node[] = [
  // Node types should match the icon keys
  { id: 0, type: 'myNodeType' },
  { id: 1, type: 'anotherNodeType' },
  { id: 2, type: 'pipe' },  // Default icons still work
];

const edges: Edge[] = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
];

const App: React.FC = () => {
  return <ProcessGraph
    nodes={nodes}
    edges={edges}
    icons={icons}
  />;
};

export default App;
