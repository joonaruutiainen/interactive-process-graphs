import React, { useCallback, useEffect, useState } from 'react';
import { Canvas, EdgeData, NodeData, Node as ReaflowNode } from 'reaflow';
import Tippy from '@tippyjs/react';
import { Edge } from '../types/Edge';
import { Node } from '../types/Node';
import NodeDetails from './NodeDetails';

interface ProcessGraphProps {
  nodes: Node[];
  edges: Edge[];
}

const nodeDataToNode = (node: NodeData): Node => ({
  ...node,
  id: parseInt(node.id, 10),
  type: node.text,
});

const ProcessGraph: React.FC<ProcessGraphProps> = ({ nodes, edges }) => {
  const [showDetails, setShowDetails] = useState<{ el: Element; node: NodeData } | undefined>(undefined);
  const [detailsVisible, setDetailsVisible] = useState(false);

  useEffect(() => {
    setShowDetails(undefined);
    setDetailsVisible(false);
  }, [nodes, edges]);

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

  const nodeOnClick = useCallback(
    (event: React.MouseEvent<SVGGElement, MouseEvent>, node: NodeData): void => {
      if (node.id === showDetails?.node.id) {
        setShowDetails(undefined);
        setDetailsVisible(false);
      } else {
        setShowDetails({ el: event.target as Element, node });
        setDetailsVisible(true);
      }
    },
    [showDetails, detailsVisible]
  );

  return (
    <>
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
        node={<ReaflowNode onClick={nodeOnClick} />}
      />
      <Tippy
        render={() => showDetails && <NodeDetails node={nodeDataToNode(showDetails.node)} />}
        reference={showDetails?.el}
        visible={detailsVisible}
      />
    </>
  );
};

export default ProcessGraph;
export { nodeDataToNode };
