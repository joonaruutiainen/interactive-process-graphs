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
    <Canvas
      readonly
      nodes={nodeData}
      edges={edgeData}
      layoutOptions={{
        'elk.direction': 'RIGHT',
        'org.eclipse.elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
        'org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment': 'BALANCED',
        'org.eclipse.elk.layered.nodePlacement.bk.edgeStraightening': 'IMPROVE_STRAIGHTNESS',
        'org.eclipse.elk.edgeRouting': 'ORTHOGONAL',
        'org.eclipse.elk.layered.layering.strategy': 'NETWORK_SIMPLEX',
        'org.eclipse.elk.layered.nodePlacement.favorStraightEdges': 'true',
        'org.eclipse.elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
      }}
    />
  );
};
export default ProcessGraph;
