import React from 'react';
import styled from 'styled-components';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Canvas, EdgeData, NodeData } from 'reaflow';
import { Edge } from '../types/Edge';
import { Node } from '../types/Node';
import useWindowDimensions from '../hooks/useWindowDimensions';

const Container = styled.div`
  background-color: lightgrey;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

const ZoomButtons = styled.div`
  display: flex;
  width: 100%;
  max-width: calc(100vw - 60px);
  margin-bottom: 10px;
  button {
    margin-left: 10px;
    width: 2em;
  }
`;

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

  const { width, height } = useWindowDimensions();
  return (
    <Container>
      <TransformWrapper wheel={{ step: 0.1 }} minScale={0.8} maxScale={10}>
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <ZoomButtons>
              <button type='button' onClick={() => zoomIn()}>
                +
              </button>
              <button type='button' onClick={() => zoomOut()}>
                -
              </button>
              <button type='button' onClick={() => resetTransform()}>
                x
              </button>
            </ZoomButtons>
            <TransformComponent>
              <Canvas
                readonly
                maxWidth={width * 0.9}
                maxHeight={height * 0.9}
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
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </Container>
  );
};
export default ProcessGraph;
