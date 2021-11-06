import React, { useCallback, useEffect, useState, useMemo } from 'react';
import ToggleButton from 'react-toggle-button';
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

const SwitchButton = styled.div`
  position: absolute;
  top: 0px;
  margin-top: 10px;
  margin: 7px;
`;

interface ProcessGraphProps {
  nodes: Node[];
  edges: Edge[];
  hideZoomButtons?: boolean;
}

const ProcessGraph: React.FC<ProcessGraphProps> = ({ nodes, edges, hideZoomButtons = false }) => {
  const [selectedNode, setSelectedNode] = useState<Node | undefined>();
  const [popupTarget, setPopupTarget] = useState<Element | undefined>();
  const [selectionMode, setSelectionMode] = useState(false);

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setPopupTarget(undefined);
    setSelectedNode(undefined);
  }, [nodes, edges]);

  const nodeData: NodeData[] = useMemo(
    () =>
      nodes.map(node => ({
        ...node,
        id: node.id.toString(),
        text: node.type,
      })),
    [nodes]
  );

  const edgeData: EdgeData[] = useMemo(
    () =>
      edges.map(edge => ({
        ...edge,
        id: `${edge.from}-${edge.to}`,
        from: edge.from.toString(),
        to: edge.to.toString(),
      })),
    [edges]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent<SVGGElement, MouseEvent>, node: NodeData): void => {
      if (!selectionMode) {
        const id = parseInt(node.id, 10);
        if (id === selectedNode?.id) {
          setSelectedNode(undefined);
          setPopupTarget(undefined);
        } else {
          setSelectedNode(nodes.find(n => n.id === id));
          setPopupTarget(event.target as Element);
        }
      }
    },
    [selectedNode, popupTarget, selectionMode]
  );

  const modeSwitch = () => {
    setSelectionMode(!selectionMode);
    setSelectedNode(undefined);
    setPopupTarget(undefined);
  };

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
                node={<ReaflowNode onClick={onNodeClick} />}
              />
              <Tippy
                render={() => selectedNode && <NodeDetails node={selectedNode} />}
                reference={popupTarget}
                visible={selectedNode !== undefined}
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
  );
};

export default ProcessGraph;
