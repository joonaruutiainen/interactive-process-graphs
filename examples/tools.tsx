import React, { useState } from 'react';
import { ProcessGraph, GraphTool, Edge, Node } from 'interactive-process-graph';

const App: React.FC = () => {
  // Nodes and edges defined in state so they can be changed at runtime
  const [nodes, setNodes] = useState<Node[]>([
    { id: 0, type: 'pipe' },
    { id: 1, type: 'tank' },
    { id: 2, type: 'tank' },
  ]);
  const [edges, setEdges] = useState<Edge[]>([
    { from: 0, to: 1 },
    { from: 1, to: 2 },
  ]);

  // Create a hook for creating the tool itself
  const useRemoveTool = (): GraphTool => ({

    // Names must be distinct from other tools!
    name: 'Remove Tool',

    // You may provide a custom icon
    icon: <img src="myimage.png" width="32px" height="32px" />,

    // Add a callback for a node being clicked
    onNodeClick: (clickedNode: Node) => {
      setNodes(nodes.filter(node => node.id != clickedNode.id));
    },

    // Add a callback for an edge being clicked
    onEdgeClick: (clickedEdge: Edge) => {
      setEdges(edges.filter(edge => (edge.from != clickedEdge.from || edge.to != clickedEdge.to)));
    },
  });

  // Create an instance of the tool
  const removeTool = useRemoveTool();

  return <ProcessGraph
    nodes={nodes}
    edges={edges}
    customGraphTools={[removeTool]}
  />;
};

export default App;
