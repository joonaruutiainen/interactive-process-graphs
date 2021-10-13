import React from 'react';
import styled from 'styled-components';
import { Canvas, EdgeData, NodeData } from 'reaflow';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Edge } from '../types/Edge';
import { Node } from '../types/Node';

const ZoomButtons = styled.div`
  display: flex;
  justify-content: center;
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
  return (
    <TransformWrapper wheel={{ step: 0.1 }} initialScale={1} minScale={0.8} maxScale={10}>
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
              zoomable={false}
              width={1800}
              height={800}
              nodes={nodeData}
              edges={edgeData}
              layoutOptions={{ 'elk.direction': 'RIGHT' }}
            />
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
};
export default ProcessGraph;
