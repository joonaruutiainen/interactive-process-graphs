import React, { useCallback, useEffect, useState, useMemo, useRef, useContext } from 'react';
import {
  Canvas,
  EdgeData,
  NodeData,
  Node as ReaflowNode,
  CanvasRef,
  Icon as ReaflowIcon,
  Edge as ReaflowEdge,
  MarkerArrow,
  Label,
} from 'reaflow';
import styled, { ThemeContext } from 'styled-components';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Icon } from 'ts-react-feather-icons';
import Tippy from '@tippyjs/react';

import icons from '../utils/icons';
import NodeDetails from './NodeDetails';
import { Edge } from '../types/Edge';
import { Node } from '../types/Node';
import useWindowDimensions from '../hooks/useWindowDimensions';

const Container = styled.div`
  background-color: ${props => props.theme.palette.background.main};
  border-radius: ${props => props.theme.borderRadius}px;
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
  background-color: ${props => props.theme.palette.common.white};
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
  width: node.type.length * 10 + 65 >= 350 ? 350 : node.type.length * 10 + 65,
  icon: {
    url: icons[node.type] || node.id % 2 === 0 ? icons.shiba : icons.dog,
    height: 30,
    width: 30,
  },
});

const edgeToEdgeData = (edge: Edge): EdgeData => ({
  id: `${edge.from}-${edge.to}`,
  from: edge.from.toString(),
  to: edge.to.toString(),
});

export interface ProcessGraphProps {
  nodes: Node[];
  edges: Edge[];
  hideZoomButtons?: boolean;
}

const ProcessGraphCanvas: React.FC<ProcessGraphProps> = ({ nodes, edges, hideZoomButtons = false }) => {
  const canvasRef = useRef<CanvasRef | null>(null);
  const theme = useContext(ThemeContext);
  const [selectedNode, setSelectedNode] = useState<Node | undefined>();
  const [popupTarget, setPopupTarget] = useState<Element | undefined>();

  const { width, height } = useWindowDimensions();

  const closePopup = () => {
    setSelectedNode(undefined);
    setPopupTarget(undefined);
  };

  useEffect(() => {
    closePopup();
  }, [nodes, edges]);

  const nodeData: NodeData[] = useMemo(() => nodes.map(nodeToNodeData), [nodes]);
  const edgeData: EdgeData[] = useMemo(() => edges.map(edgeToEdgeData), [edges]);

  const onNodeClick = useCallback(
    (event: React.MouseEvent<SVGGElement, MouseEvent>, node: NodeData): void => {
      const id = parseInt(node.id, 10);
      if (id === selectedNode?.id) {
        closePopup();
      } else {
        setSelectedNode(nodes.find(n => n.id === id));
        setPopupTarget(event.target as Element);
      }
    },
    [selectedNode, popupTarget]
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
                node={
                  <ReaflowNode
                    style={{
                      fill: theme.palette.primary.main,
                      strokeWidth: 2,
                      rx: theme.borderRadius,
                      ry: theme.borderRadius,
                    }}
                    label={
                      <Label
                        style={{
                          fontFamily: theme.fontFamily,
                          textTransform: 'uppercase',
                          fill: theme.palette.primary.text,
                        }}
                      />
                    }
                    onClick={onNodeClick}
                    icon={<ReaflowIcon />}
                  />
                }
                arrow={
                  <MarkerArrow
                    style={{
                      stroke: theme.palette.primary.main,
                      fill: theme.palette.primary.main,
                    }}
                  />
                }
                edge={<ReaflowEdge style={{ stroke: theme.palette.secondary.main }} />}
                onLayoutChange={() => canvasRef.current?.fitCanvas?.()}
                onCanvasClick={closePopup}
              />
              <Tippy
                render={attrs =>
                  selectedNode && <NodeDetails node={selectedNode} dataPlacement={attrs['data-placement']} />
                }
                reference={popupTarget}
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

export default ProcessGraphCanvas;
