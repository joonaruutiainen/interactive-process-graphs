import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { Canvas, EdgeData, NodeData, Node as ReaflowNode, Edge as ReaflowEdge, CanvasRef } from 'reaflow';
import styled from 'styled-components';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Icon } from 'ts-react-feather-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { followCursor } from 'tippy.js';

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

const nodeToNodeData = (node: Node): NodeData => ({
  id: node.id.toString(),
  text: node.type,
});

const edgeToEdgeData = (edge: Edge): EdgeData => ({
  id: `${edge.from}-${edge.to}`,
  from: edge.from.toString(),
  to: edge.to.toString(),
});

interface ProcessGraphProps {
  nodes: Node[];
  edges: Edge[];
  hideZoomButtons?: boolean;
}

const ProcessGraph: React.FC<ProcessGraphProps> = ({ nodes, edges, hideZoomButtons = false }) => {
  const canvasRef = useRef<CanvasRef | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | undefined>();
  const [popupTargetNode, setPopupTargetNode] = useState<Element | undefined>();

  const [selectedEdge, setSelectedEdge] = useState<EdgeData | undefined>();
  const [popupTargetEdge, setPopupTargetEdge] = useState<Element | undefined>();

  const { width, height } = useWindowDimensions();

  const nodeData: NodeData[] = useMemo(() => nodes.map(nodeToNodeData), [nodes]);
  const edgeData: EdgeData[] = useMemo(() => edges.map(edgeToEdgeData), [edges]);

  const closeEdgePopup = () => {
    setSelectedEdge(undefined);
    setPopupTargetEdge(undefined);
  };

  const closeNodePopup = () => {
    setSelectedNode(undefined);
    setPopupTargetNode(undefined);
  };

  const closePopups = () => {
    closeNodePopup();
    closeEdgePopup();
  };

  const getEdgeTooltipText = (from: string | undefined, to: string | undefined): string =>
    `From ${nodes.find(n => n.id.toString() === from)?.type} to ${nodes.find(n => n.id.toString() === to)?.type}`;

  const onNodeClick = useCallback(
    (event: React.MouseEvent<SVGGElement, MouseEvent>, node: NodeData): void => {
      const id = parseInt(node.id, 10);
      if (id === selectedNode?.id) {
        closeNodePopup();
      } else {
        setSelectedNode(nodes.find(n => n.id === id));
        setPopupTargetNode(event.target as Element);
      }
    },
    [selectedNode, popupTargetNode]
  );

  const onEdgeClick = useCallback(
    (event: React.MouseEvent<SVGGElement, MouseEvent>, edge: EdgeData): void => {
      const selectedId = `${selectedEdge?.from}-${selectedEdge?.to}`;
      if (edge.id === selectedId) {
        closeEdgePopup();
      } else {
        setSelectedEdge(edge);
        setPopupTargetEdge(event.target as Element);
      }
    },
    [selectedEdge, popupTargetEdge]
  );

  return (
    <Container>
      <TransformWrapper wheel={{ step: 0.1 }} minScale={0.8} maxScale={10} doubleClick={{ disabled: true }}>
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent>
              <Canvas
                ref={canvasRef}
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
                node={<ReaflowNode onClick={onNodeClick} />}
                edge={<ReaflowEdge onClick={onEdgeClick} onLeave={closeEdgePopup} />}
                onLayoutChange={() => {
                  closePopups();
                  canvasRef.current?.fitCanvas?.();
                }}
                onCanvasClick={closePopups}
              />
              <Tippy
                render={attrs =>
                  selectedNode && <NodeDetails node={selectedNode} dataPlacement={attrs['data-placement']} />
                }
                reference={popupTargetNode}
                visible={selectedNode !== undefined}
                interactive
                appendTo={document.body}
                popperOptions={{
                  strategy: 'fixed',
                  modifiers: [
                    {
                      name: 'flip',
                      options: {
                        fallbackPlacements: ['bottom', 'right', 'left'],
                      },
                    },
                  ],
                }}
              />
              <Tippy
                content={getEdgeTooltipText(selectedEdge?.from, selectedEdge?.to)}
                reference={popupTargetEdge}
                visible={selectedEdge !== undefined}
                arrow={false}
                followCursor
                plugins={[followCursor]}
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
