import React, { useCallback, useState, useMemo, useRef } from 'react';
import { Canvas, EdgeData, NodeData, Node as ReaflowNode, Edge as ReaflowEdge, CanvasRef } from 'reaflow';
import styled, { ThemeProvider } from 'styled-components';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import ToggleButton from 'react-toggle-button';
import { Icon } from 'ts-react-feather-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { followCursor } from 'tippy.js';

import NodeDetails from './NodeDetails';
import { Edge } from '../types/Edge';
import { Node } from '../types/Node';
import useWindowDimensions from '../hooks/useWindowDimensions';
import defaultTheme from '../theme';

const Container = styled.div`
  background-color: ${props => props.theme.palette.background.main};
  border-radius: ${props => props.theme.borderRadius};
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

const SwitchButton = styled.div`
  position: absolute;
  top: 0px;
  margin-top: 10px;
  margin: 7px;
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
  const [selectionMode, setSelectionMode] = useState(false);

  const [selectedNode, setSelectedNode] = useState<Node | undefined>();
  const [popupTargetNode, setPopupTargetNode] = useState<Element | undefined>();
  const [selectedEdge, setSelectedEdge] = useState<EdgeData | undefined>();
  let edgeHoverTimeout: ReturnType<typeof setTimeout>;

  const { width, height } = useWindowDimensions();

  const nodeData: NodeData[] = useMemo(() => nodes.map(nodeToNodeData), [nodes]);
  const edgeData: EdgeData[] = useMemo(() => edges.map(edgeToEdgeData), [edges]);

  const closeNodePopup = () => {
    setSelectedNode(undefined);
    setPopupTargetNode(undefined);
  };

  const getEdgeTooltipText = (from: string | undefined, to: string | undefined): string => {
    if (from === undefined || to === undefined) return '';
    const fromNode = nodes.find(n => n.id.toString() === from);
    const toNode = nodes.find(n => n.id.toString() === to);
    return `From ${fromNode?.type} ${fromNode?.id} to ${toNode?.type} ${toNode?.id}`;
  };

  const onNodeClick = useCallback(
    (event: React.MouseEvent<SVGGElement, MouseEvent>, node: NodeData): void => {
      if (selectionMode) {
        return;
      }
      const id = parseInt(node.id, 10);
      if (id === selectedNode?.id) {
        closeNodePopup();
      } else {
        setSelectedNode(nodes.find(n => n.id === id));
        setPopupTargetNode(event.target as Element);
      }
    },
    [selectedNode, popupTargetNode, selectionMode]
  );

  const modeSwitch = () => {
    setSelectionMode(!selectionMode);
    closeNodePopup();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
                  edge={
                    <ReaflowEdge
                      onEnter={(_, edge) => {
                        edgeHoverTimeout = setTimeout(() => setSelectedEdge(edge), 1000);
                      }}
                      onLeave={() => {
                        clearTimeout(edgeHoverTimeout);
                        setSelectedEdge(undefined);
                      }}
                    />
                  }
                  onLayoutChange={() => {
                    closeNodePopup();
                    resetTransform();
                    canvasRef.current?.fitCanvas?.();
                  }}
                  onCanvasClick={closeNodePopup}
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
                  visible={selectedEdge !== undefined}
                  arrow={false}
                  followCursor
                  plugins={[followCursor]}
                />
              </TransformComponent>
              <SwitchButton>
                Selection mode
                <ToggleButton value={selectionMode} onToggle={modeSwitch} />
              </SwitchButton>
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
    </ThemeProvider>
  );
};

export default ProcessGraph;
