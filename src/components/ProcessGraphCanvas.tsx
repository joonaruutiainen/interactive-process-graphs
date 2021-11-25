import React, { useCallback, useMemo, useRef, useContext } from 'react';
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
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import icons from '../utils/icons';
import { Edge } from '../types/Edge';
import { Node } from '../types/Node';
import useWindowDimensions from '../hooks/useWindowDimensions';
import useGraphTools, { GraphTool } from '../hooks/graphTools/useGraphTools';
import usePopupInfoTool from '../hooks/graphTools/usePopupInfoTool';

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
  hideZoomButtons?: boolean;
  iconSize?: number; // default is 30, icon and label positions in a node are messed up if this is changed (fix pls)
  customGraphTools?: GraphTool[];
}

const ProcessGraphCanvas: React.FC<ProcessGraphProps> = ({
  nodes,
  edges,
  hideZoomButtons = false,
  iconSize = 30,
  customGraphTools = [],
}) => {
  const canvasRef = useRef<CanvasRef | null>(null);
  const theme = useContext(ThemeContext);

  const { width, height } = useWindowDimensions();

  const reaflowNodes: NodeData[] = useMemo(() => nodes.map(node => nodeToNodeData(node, iconSize)), [nodes]);
  const reaflowEdges: EdgeData[] = useMemo(() => edges.map(edgeToEdgeData), [edges]);

  const popupInfoTool = usePopupInfoTool();
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
                edge={<ReaflowEdge style={{ stroke: theme.palette.secondary.main }} onClick={handleEdgeClick} />}
                onLayoutChange={layout => {
                  activeTool.reset?.();
                  resetTransform();
                  fitGraph(layout);
                }}
                onCanvasClick={activeTool.reset}
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
            <div>
              {allTools.map(tool => (
                <button type='button' onClick={() => setActiveTool(tool)} disabled={activeTool.name === tool.name}>
                  {tool.name}
                </button>
              ))}
            </div>
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
