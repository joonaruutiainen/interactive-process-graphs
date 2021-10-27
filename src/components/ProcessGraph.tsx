import React, { useCallback, useEffect, useState } from 'react';
import { Canvas, EdgeData, NodeData, Node as ReaflowNode } from 'reaflow';
import styled from 'styled-components';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Icon } from 'ts-react-feather-icons';
import Tippy from '@tippyjs/react';

import NodeDetails from './NodeDetails';
import { Edge } from '../types/Edge';
import { Node } from '../types/Node';
import useWindowDimensions from '../hooks/useWindowDimensions';

const Container = styled.div`
  background-color: lightgrey;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
  position: relative;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0px;
  width: fit-content;
  margin-bottom: 10px;
`;

const ZoomButton = styled.button`
  display: flex;
  align-items: center;
  margin: 7px auto 7px 15px;
  width: fit-content;
  text-align: center;
  padding: 5px 6px;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

interface ProcessGraphProps {
  nodes: Node[];
  edges: Edge[];
  hideZoomButtons?: boolean;
}

const nodeDataToNode = (node: NodeData): Node => ({
  ...node,
  id: parseInt(node.id, 10),
  type: node.text,
});

const ProcessGraph: React.FC<ProcessGraphProps> = ({ nodes, edges, hideZoomButtons = false }) => {
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

  const { width, height } = useWindowDimensions();

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
    <Container>
      <TransformWrapper wheel={{ step: 0.1 }} minScale={0.8} maxScale={10} doubleClick={{ disabled: true }}>
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent>
              <Canvas
                readonly
                zoomable={false}
                maxWidth={width * 0.9}
                maxHeight={height * 0.8}
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
            </TransformComponent>
            {!hideZoomButtons && (
              <ButtonGroup>
                <ZoomButton onClick={() => zoomIn()}>
                  <Icon name='plus' size={24} />
                </ZoomButton>
                <ZoomButton onClick={() => zoomOut()}>
                  <Icon name='minus' size={24} />
                </ZoomButton>
                <ZoomButton onClick={() => resetTransform()}>
                  <Icon name='maximize' size={24} />
                </ZoomButton>
              </ButtonGroup>
            )}
          </>
        )}
      </TransformWrapper>
    </Container>
  );
};

export default ProcessGraph;
export { nodeDataToNode };
