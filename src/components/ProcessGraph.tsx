import React, { useState } from 'react';
import { Canvas, EdgeData, NodeData, Node as ReaflowNode, NodeChildProps } from 'reaflow';
import { Edge } from '../types/Edge';
import { Node } from '../types/Node';
import NodeDetails from './NodeDetails';

interface ProcessGraphProps {
  nodes: Node[];
  edges: Edge[];
}

const ProcessGraph: React.FC<ProcessGraphProps> = ({ nodes, edges }) => {
  const [showDetailsId, setShowDetailsId] = useState<string>('');

  const nodeData: NodeData[] = nodes.map(node => ({
    ...node,
    id: node.id.toString(),
    text: node.type,
  }));
  const edgeData: EdgeData[] = edges.map(edge => ({
    ...edge,
    id: `${edge.from}-${edge.to}`,
    from: edge.from.toString(),
    to: edge.to.toString(),
  }));

  const nodeDataToNode = (node: NodeData): Node => ({
    ...node,
    id: parseInt(node.id, 10),
    type: node.text,
  });

  const nodeOnClick = (node: NodeData): void => {
    if (node.id !== showDetailsId) setShowDetailsId(node.id);
    else setShowDetailsId('');
  };

  const renderDetails = (event: NodeChildProps): React.SVGProps<SVGForeignObjectElement> => (
    <foreignObject
      x='-110px'
      y='-130px'
      height='150px'
      width='300px'
      display={event.node.id === showDetailsId ? '' : 'none'}
    >
      <NodeDetails node={nodeDataToNode(event.node)} />
    </foreignObject>
  );

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
      node={<ReaflowNode onClick={(_, node) => nodeOnClick(node)}>{event => renderDetails(event)}</ReaflowNode>}
      onCanvasClick={() => setShowDetailsId('')}
    />
  );
};

export default ProcessGraph;
