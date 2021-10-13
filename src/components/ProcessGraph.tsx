import React from 'react';
import { Canvas, EdgeData, NodeData } from 'reaflow';
import { Edge } from '../types/Edge';
import { Node } from '../types/Node';

interface ProcessGraphProps {
  nodes: Node[];
  edges: Edge[];
}

const ProcessGraph: React.FC<ProcessGraphProps> = ({ nodes, edges }) => {
  const nodeData: NodeData[] = nodes.map(node => ({ ...node, id: node.id.toString(), text: node.type }));
  const edgeData: EdgeData[] = edges.map(edge => ({
    ...edge,
    id: `${edge.from}-${edge.to}`,
    from: edge.from.toString(),
    to: edge.to.toString(),
  }));
  return (
    <Canvas width={1800} height={800} nodes={nodeData} edges={edgeData} layoutOptions={{ 'elk.direction': 'RIGHT' }} />
  );
};
export default ProcessGraph;
