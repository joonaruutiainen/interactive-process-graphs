import React, { useCallback, useState, useMemo, useRef, useContext, useEffect } from 'react';
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
  ElkRoot,
} from 'reaflow';
import styled, { ThemeContext } from 'styled-components';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Icon } from 'ts-react-feather-icons';
import ToggleButton from 'react-toggle-button';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { followCursor } from 'tippy.js';

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

const SwitchButton = styled.div`
  position: absolute;
  top: 0px;
  margin-top: 10px;
  margin: 7px;
`;

const StyledTippy = styled(Tippy)`
  font-family: ${props => props.theme.fontFamily};
`;

const nodeToNodeData = (node: Node, iconSize: number): NodeData => {
  const nodeWidth = node.type.length * 10 + iconSize * 2.1 >= 350 ? 350 : node.type.length * 10 + iconSize * 2.1;
  const nodeHeight = iconSize > 30 ? iconSize + 20 : 50;
  return {
    id: node.id.toString(),
    text: node.type,
    width: nodeWidth,
    height: nodeHeight,
    icon: {
      url: icons[node.type] || node.id % 2 === 0 ? icons.shiba : icons.dog,
      height: iconSize,
      width: iconSize,
    },
  };
};

const edgeToEdgeData = (edge: Edge): EdgeData => ({
  id: `${edge.from}-${edge.to}`,
  from: edge.from.toString(),
  to: edge.to.toString(),
});

export interface ProcessGraphProps {
  nodes: Node[];
  edges: Edge[];
  disableSelections?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSelectNodes?: (selection: number[]) => void;
  // eslint-disable-next-line no-unused-vars
  onSelectEdges?: (selection: string[]) => void;
  // eslint-disable-next-line no-unused-vars
  onNodeClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>, node: NodeData) => void;
  // eslint-disable-next-line no-unused-vars
  onEdgeClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>, edge: EdgeData) => void;
  hideZoomButtons?: boolean;
  iconSize?: number; // default is 30, icon and label positions in a node are messed up if this is changed (fix pls)
}

const ProcessGraphCanvas: React.FC<ProcessGraphProps> = ({
  nodes,
  edges,
  disableSelections = false,
  onSelectNodes = undefined,
  onSelectEdges = undefined,
  onNodeClick = undefined,
  onEdgeClick = undefined,
  hideZoomButtons = false,
  iconSize = 30,
}) => {
  const canvasRef = useRef<CanvasRef | null>(null);
  const theme = useContext(ThemeContext);

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | undefined>();
  const [popupTargetNode, setPopupTargetNode] = useState<Element | undefined>();
  const [selectedEdge, setSelectedEdge] = useState<EdgeData | undefined>();
  const [nodeSelection, setNodeSelection] = useState<number[]>([]);
  const [edgeSelection, setEdgeSelection] = useState<string[]>([]);

  let edgeHoverTimeout: ReturnType<typeof setTimeout>;

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (onSelectNodes) onSelectNodes(nodeSelection);
  }, [nodeSelection, onSelectNodes]);

  useEffect(() => {
    if (onSelectEdges) onSelectEdges(edgeSelection);
  }, [edgeSelection, onSelectEdges]);

  const closeNodePopup = () => {
    setSelectedNode(undefined);
    setPopupTargetNode(undefined);
  };

  const nodeData: NodeData[] = useMemo(() => nodes.map(node => nodeToNodeData(node, iconSize)), [nodes]);
  const edgeData: EdgeData[] = useMemo(() => edges.map(edgeToEdgeData), [edges]);

  const getEdgeTooltipText = (from: string | undefined, to: string | undefined): string => {
    if (from === undefined || to === undefined) return '';
    const fromNode = nodes.find(n => n.id.toString() === from);
    const toNode = nodes.find(n => n.id.toString() === to);
    return `From ${fromNode?.type} ${fromNode?.id} to ${toNode?.type} ${toNode?.id}`;
  };

  const handleNodeClick = useCallback(
    (event: React.MouseEvent<SVGGElement, MouseEvent>, node: NodeData): void => {
      if (onNodeClick) {
        onNodeClick(event, node);
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
    [selectedNode, popupTargetNode, onNodeClick]
  );

  const handleNodeSelect = useCallback(
    (node: NodeData): void => {
      const id = parseInt(node.id, 10);
      let newSelection = [...nodeSelection];
      if (!nodeSelection.find(n => n === id)) {
        newSelection = [...nodeSelection, id];
        newSelection.sort((a, b) => a - b);
      } else newSelection = newSelection.filter(n => n !== id);
      setNodeSelection(newSelection);
    },
    [nodeSelection]
  );

  const handleEdgeClick = useCallback(
    (event: React.MouseEvent<SVGGElement, MouseEvent>, edge: EdgeData): void => {
      if (onEdgeClick) {
        onEdgeClick(event, edge);
      }
    },
    [onEdgeClick]
  );

  const handleEdgeSelect = useCallback(
    (edge: EdgeData): void => {
      const { id } = edge;
      let newSelection = [...edgeSelection];
      if (!edgeSelection.find(e => e === id)) {
        newSelection = [...edgeSelection, id];
        newSelection.sort();
      } else newSelection = newSelection.filter(e => e !== id);
      setEdgeSelection(newSelection);
    },
    [edgeSelection]
  );

  const modeSwitch = () => {
    if (selectionMode) {
      setNodeSelection([]);
      setEdgeSelection([]);
    }
    setSelectionMode(!selectionMode);
    closeNodePopup();
  };

  const fitGraph = (layout: ElkRoot) => {
    if (layout.height && layout.width) {
      // TODO: calculate the width of icons to be added to layout width
      // total width of icons = number of node columns * iconSize
      const layoutWidth: number = layout.width + 300; // replace 300 with total width of icons
      const layoutHeight: number = layout.height; // if iconSize > minimun node size (50), this has to be increased as well
      const widthZoom = width / layoutWidth;
      const heightZoom = height / layoutHeight;
      const scale = Math.min(heightZoom, widthZoom, 1);
      canvasRef?.current?.setZoom?.(scale - 1);
      canvasRef?.current?.centerCanvas?.();
    }
  };

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
                minZoom={-1000}
                maxZoom={1000}
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
                    onClick={(event, node) => {
                      if (!disableSelections && selectionMode) handleNodeSelect(node);
                      else handleNodeClick(event, node);
                    }}
                    icon={<ReaflowIcon x={50} y={50} height={iconSize} width={iconSize} />}
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
                edge={
                  <ReaflowEdge
                    style={{ stroke: theme.palette.secondary.main }}
                    onClick={(event, edge) => {
                      if (!disableSelections && selectionMode) handleEdgeSelect(edge);
                      else handleEdgeClick(event, edge);
                    }}
                    onEnter={(_, edge) => {
                      edgeHoverTimeout = setTimeout(() => setSelectedEdge(edge), 1000);
                    }}
                    onLeave={() => {
                      clearTimeout(edgeHoverTimeout);
                      setSelectedEdge(undefined);
                    }}
                  />
                }
                onLayoutChange={layout => {
                  if (selectionMode) {
                    setNodeSelection([]);
                    setEdgeSelection([]);
                  } else closeNodePopup();
                  resetTransform();
                  fitGraph(layout);
                }}
                onCanvasClick={() => {
                  if (selectionMode) {
                    setNodeSelection([]);
                    setEdgeSelection([]);
                  } else closeNodePopup();
                }}
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
              <StyledTippy
                content={getEdgeTooltipText(selectedEdge?.from, selectedEdge?.to)}
                visible={selectedEdge !== undefined}
                arrow={false}
                followCursor
                plugins={[followCursor]}
              />
            </TransformComponent>
            {!disableSelections && (
              <SwitchButton>
                Selection mode
                <ToggleButton value={selectionMode} onToggle={modeSwitch} />
              </SwitchButton>
            )}
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
