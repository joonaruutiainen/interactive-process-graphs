import React from 'react';
import { ProcessGraph, IconMap, Edge, Node, defaultIcons } from 'interactive-process-graph';

// Import custom icons manually
import { MyCustomIcon, AnotherIcon } from 'my-custom-icons';

// Create an IconMap with node types as keys and custom icons as values
const icons: IconMap = {
  'myNodeType': MyCustomIcon,
  'anotherNodeType': AnotherIcon,

  // You can extend your icons with the default icons, if needed
  ...defaultIcons,
};


const nodes: Node[] = [
  // Node types should match the icon keys
  { id: 0, type: 'myNodeType' },
  { id: 1, type: 'anotherNodeType' },
  { id: 2, type: 'pipe' },  // 'pipe' is from the defaultIcons
];

const edges: Edge[] = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
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
