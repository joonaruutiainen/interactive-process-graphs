import React, { useCallback, useState, useEffect, useMemo, useRef, useContext } from 'react';
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
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { Icon } from 'ts-react-feather-icons';
import Tippy, { useSingleton } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { Edge } from '../types/Edge';
import { Node, NodeDataFormat } from '../types/Node';
import useGraphTools, { GraphTool } from '../hooks/graphTools/useGraphTools';
import usePopupInfoTool from '../hooks/graphTools/usePopupInfoTool';
import InfoBox from './InfoBox';
import { IconMap } from '../types/IconMap';

import Button from '../styles/components';

const Container = styled.div`
  background-color: ${props => props.theme.palette.background.main};
  border-radius: ${props => props.theme.borderRadius}px;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
  position: relative;
`;

const Controls = styled.div`
  display: inline-flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const ButtonGroup = styled.div`
  background-color: ${props => props.theme.palette.background.main};
  border-radius: ${props => props.theme.borderRadius}px;
  display: flex;
  flex-direction: row;
`;

const ControlGroup = styled.div`
  background-color: ${props => props.theme.palette.background.main};
  border-radius: ${props => props.theme.borderRadius}px;
  padding-left: 13px;
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 0;
  bottom: 0;
`;

const ButtonDiv = styled.div`
  display: inline-block;
  width: min-width;
  height: min-height;
  margin: 13px 0 13px 13px;
`;

const ToolButton = styled(Button)`
  &:disabled {
    opacity: 0.5;
  }
`;

const InfoButton = styled(Button)`
  margin: 13px 13px 13px 0;
`;

const StyledTippy = styled(Tippy)`
  font-family: ${props => props.theme.fontFamily};
`;

// Default is 30, icon and label positions in a node are messed up if this is changed (fix pls)
const ICON_SIZE = 30;

// Explicitly reserves 0x0 space for icon to prevent default reservation
const EMPTY_ICON = {
  url: '',
  height: 0,
  width: 0,
};

const nodeToNodeData = (node: Node, iconUrl?: string): NodeData => {
  const text = node.type.length > 20 ? `${node.type.substr(0, 19)}...` : node.type;
  const textWidth = text.length * 10;

  let nodeWidth = textWidth + 40;
  let maxWidth = 250;
  let icon;

  if (iconUrl) {
    nodeWidth += ICON_SIZE;
    maxWidth += ICON_SIZE;
    icon = {
      url: iconUrl,
      height: ICON_SIZE,
      width: ICON_SIZE,
    };
  } else {
    icon = EMPTY_ICON;
  }

  return {
    id: node.id.toString(),
    text,
    width: Math.min(nodeWidth, maxWidth),
    height: Math.max(ICON_SIZE + 20, 50),
    icon,
  };
};

const edgeToEdgeData = (edge: Edge): EdgeData => ({
  id: `${edge.from}-${edge.to}`,
  from: edge.from.toString(),
  to: edge.to.toString(),
});

export interface ProcessGraphCanvasProps {
  /**
   * Nodes to render in the process graph.
   */
  nodes: Node[];

  /**
   * Edges to render in the process graph.
   */
  edges: Edge[];

  /**
   * Whether to hide the zoom buttons.
   * @default false
   */
  hideZoomButtons?: boolean;

  /**
   * Whether to hide the info button.
   * @default false
   */
  hideInfoButton?: boolean;

  /**
   * List of custom graph tools to display in the toolbar.
   */
  customGraphTools?: GraphTool[];

  /**
   * Whether to display the node data as JSON or YAML.
   * @default 'json'
   */
  nodeDataFormat?: NodeDataFormat;

  /**
   * Width of the process graph canvas.
   */
  width: number;

  /**
   * Height of the process graph canvas.
   */
  height: number;

  /**
   * Node types mapped to their corresponding icon URLs.
   */
  icons?: IconMap;
}

const ProcessGraphCanvas: React.FC<ProcessGraphCanvasProps> = ({
  nodes,
  edges,
  hideZoomButtons = false,
  hideInfoButton = false,
  customGraphTools = [],
  nodeDataFormat = 'json',
  width,
  height,
  icons,
}) => {
  const canvasRef = useRef<CanvasRef | null>(null);
  const zoomRef = useRef<ReactZoomPanPinchRef>(null);
  const theme = useContext(ThemeContext);
  const [infoVisible, setInfoVisible] = useState<boolean>(false);
  const [tooltipSource, tooltipTarget] = useSingleton();

  const reaflowNodes: NodeData[] = useMemo(
    () => nodes.map(node => nodeToNodeData(node, icons?.[node.type])),
    [nodes, icons]
  );
  const reaflowEdges: EdgeData[] = useMemo(() => edges.map(edgeToEdgeData), [edges]);

  const popupInfoTool = usePopupInfoTool(icons, nodeDataFormat);
  const [activeTool, setActiveTool, allTools] = useGraphTools([popupInfoTool, ...customGraphTools]);
  const activeToolTippyProps = useMemo(() => activeTool.getTippyProps?.(), [activeTool]);

  const handleNodeClick = useCallback(
    (event: React.MouseEvent<SVGGElement, MouseEvent>, nodeData: NodeData): void => {
      const id = parseInt(nodeData.id, 10);
      const node = nodes.find(n => n.id === id);
      if (node) {
        activeTool.onNodeClick?.(node, event);
      }
    },
    [activeTool]
  );

  const handleEdgeClick = useCallback(
    (event: React.MouseEvent<SVGGElement, MouseEvent>, edgeData: EdgeData): void => {
      const [fromId, toId] = edgeData.id.split('-').map(id => parseInt(id, 10));
      const edge = edges.find(e => e.from === fromId && e.to === toId);
      if (edge) {
        activeTool.onEdgeClick?.(edge, event);
      }
    },
    [activeTool]
  );

  const fitGraph = (layout: ElkRoot) => {
    if (layout.height && layout.width) {
      const layoutWidth: number = layout.width;
      const layoutHeight: number = layout.height;
      const widthZoom = width / layoutWidth;
      const heightZoom = height / layoutHeight;
      const scale = Math.min(heightZoom, widthZoom, 1);
      canvasRef?.current?.setZoom?.(scale - 1);
      canvasRef?.current?.centerCanvas?.();
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !zoomRef.current) return;
    fitGraph(canvasRef.current.layout);
    zoomRef.current.setTransform(
      zoomRef.current.state.positionX,
      zoomRef.current.state.positionY,
      zoomRef.current.state.previousScale
    );
  }, [width, height]);

  return (
    <Container>
      <TransformWrapper
        ref={zoomRef}
        wheel={{ step: 0.1 }}
        minScale={0.8}
        maxScale={10}
        doubleClick={{ disabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent>
              <Canvas
                ref={canvasRef}
                readonly
                zoomable={false}
                maxWidth={width}
                maxHeight={height}
                minZoom={-1000}
                maxZoom={1000}
                nodes={reaflowNodes}
                edges={reaflowEdges}
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
                      stroke: theme.palette.secondary.main,
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
                    onClick={handleNodeClick}
                    icon={icons && <ReaflowIcon x={50} y={50} height={ICON_SIZE} width={ICON_SIZE} />}
                  />
                }
                arrow={
                  <MarkerArrow
                    style={{
                      stroke: theme.palette.secondary.main,
                      fill: theme.palette.secondary.main,
                    }}
                  />
                }
                edge={<ReaflowEdge style={{ stroke: theme.palette.secondary.main }} onClick={handleEdgeClick} />}
                onLayoutChange={layout => {
                  activeTool.reset?.();
                  resetTransform();
                  fitGraph(layout);
                  setInfoVisible(false);
                }}
                onCanvasClick={() => {
                  activeTool.reset?.();
                  setInfoVisible(false);
                }}
              />
              <Tippy
                render={activeToolTippyProps?.render}
                reference={activeToolTippyProps?.reference}
                visible={activeToolTippyProps?.visible ?? false}
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

            <StyledTippy singleton={tooltipSource} arrow={false} />
            <Controls>
              {!hideZoomButtons && (
                <ButtonGroup>
                  <Tippy content='Zoom in' singleton={tooltipTarget}>
                    <ButtonDiv>
                      <Button onClick={() => zoomIn()}>
                        <Icon name='plus' size={24} />
                      </Button>
                    </ButtonDiv>
                  </Tippy>
                  <Tippy content='Zoom out' singleton={tooltipTarget}>
                    <ButtonDiv>
                      <Button onClick={() => zoomOut()}>
                        <Icon name='minus' size={24} />
                      </Button>
                    </ButtonDiv>
                  </Tippy>
                  <Tippy content='Reset zoom' singleton={tooltipTarget}>
                    <ButtonDiv>
                      <Button onClick={() => resetTransform()}>
                        <Icon name='maximize' size={24} />
                      </Button>
                    </ButtonDiv>
                  </Tippy>
                </ButtonGroup>
              )}
              <ButtonGroup>
                {allTools.map(tool => (
                  <Tippy key={tool.name} content={tool.name} singleton={tooltipTarget}>
                    <ButtonDiv>
                      <ToolButton onClick={() => setActiveTool(tool)} disabled={activeTool.name === tool.name}>
                        {tool.icon}
                      </ToolButton>
                    </ButtonDiv>
                  </Tippy>
                ))}
              </ButtonGroup>
            </Controls>
            {!hideInfoButton && (
              <Controls>
                <ControlGroup>
                  <Tippy content='Instructions' singleton={tooltipTarget}>
                    <InfoButton onClick={() => setInfoVisible(!infoVisible)}>
                      <Icon name='info' size={24} />
                    </InfoButton>
                  </Tippy>
                  {infoVisible && <InfoBox handleClose={() => setInfoVisible(false)} />}
                </ControlGroup>
              </Controls>
            )}
          </>
        )}
      </TransformWrapper>
    </Container>
  );
};

export default ProcessGraphCanvas;
