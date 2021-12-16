import React, { useCallback, useState } from 'react';
import { Placement } from 'tippy.js';
import { Icon } from 'ts-react-feather-icons';

import { EdgeClickCallback, GraphTool, NodeClickCallback } from './useGraphTools';
import { Node, NodeDataFormat } from '../../types/Node';
import { Edge } from '../../types/Edge';
import { EdgeDetailsPopup, NodeDetailsPopup } from '../../components/DetailsPopup';
import { IconMap } from '../../types/IconMap';

type TippyAttrs = {
  'data-placement': Placement;
  'data-reference-hidden'?: string;
  'data-escaped'?: string;
};

/**
 * Hook for using a default popup info tool.
 * @param icons Node types mapped to their corresponding icons.
 * @param nodeDataFormat Format to display the node data in. 'json' or 'yaml'.
 * @returns The popup info tool.
 */
const usePopupInfoTool = (icons?: IconMap, nodeDataFormat?: NodeDataFormat): GraphTool => {
  const [selectedEdge, setSelectedEdge] = useState<Edge | undefined>();
  const [selectedNode, setSelectedNode] = useState<Node | undefined>();
  const [tippyTargetElement, setTippyTargetElement] = useState<Element | undefined>();

  const reset: () => void = useCallback(() => {
    setSelectedEdge(undefined);
    setSelectedNode(undefined);
    setTippyTargetElement(undefined);
  }, []);

  const onEdgeClick: EdgeClickCallback = useCallback(
    (edge, event) => {
      if (selectedEdge?.from === edge.from && selectedEdge.to === edge.to) {
        reset();
      } else {
        setSelectedEdge(edge);
        setSelectedNode(undefined);
        setTippyTargetElement(event.target as Element);
      }
    },
    [selectedEdge]
  );

  const onNodeClick: NodeClickCallback = useCallback(
    (node, event) => {
      if (selectedNode?.id === node.id) {
        reset();
      } else {
        setSelectedEdge(undefined);
        setSelectedNode(node);
        setTippyTargetElement(event.target as Element);
      }
    },
    [selectedNode]
  );

  const getTippyProps = useCallback(() => {
    if (selectedEdge) {
      return {
        render: (attrs: TippyAttrs) =>
          React.createElement(EdgeDetailsPopup, {
            edge: selectedEdge,
            dataPlacement: attrs['data-placement'],
            onClose: () => setSelectedEdge(undefined),
          }),
        reference: tippyTargetElement,
        visible: true,
      };
    }
    if (selectedNode) {
      return {
        render: (attrs: TippyAttrs) =>
          React.createElement(NodeDetailsPopup, {
            node: selectedNode,
            icon: icons?.[selectedNode.type],
            dataPlacement: attrs['data-placement'],
            textFormat: nodeDataFormat,
            onClose: () => setSelectedNode(undefined),
          }),
        reference: tippyTargetElement,
        visible: true,
      };
    }
    return {
      render: undefined,
      reference: undefined,
      visible: false,
    };
  }, [selectedEdge, selectedNode, tippyTargetElement, icons]);

  return {
    name: 'Node Info Tool',
    icon: <Icon name='mouse-pointer' />,
    reset,
    onEdgeClick,
    onNodeClick,
    getTippyProps,
  };
};

export default usePopupInfoTool;
