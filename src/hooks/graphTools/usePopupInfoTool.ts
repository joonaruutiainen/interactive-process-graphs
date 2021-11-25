import React, { useState } from 'react';
import { Placement } from 'tippy.js';

import { EdgeClickCallback, GraphTool, NodeClickCallback } from './useGraphTools';
import { Node } from '../../types/Node';
import { Edge } from '../../types/Edge';
import { EdgeDetailsPopup, NodeDetailsPopup } from '../../components/DetailsPopup';

type TippyAttrs = {
  'data-placement': Placement;
  'data-reference-hidden'?: string;
  'data-escaped'?: string;
};

const usePopupInfoTool = (): GraphTool => {
  const [selectedEdge, setSelectedEdge] = useState<Edge | undefined>();
  const [selectedNode, setSelectedNode] = useState<Node | undefined>();
  const [tippyTargetElement, setTippyTargetElement] = useState<Element | undefined>();

  const reset = (): void => {
    setSelectedEdge(undefined);
    setSelectedNode(undefined);
    setTippyTargetElement(undefined);
  };

  const onEdgeClick: EdgeClickCallback = (edge, event) => {
    if (selectedEdge?.from === edge.from && selectedEdge.to === edge.to) {
      reset();
    } else {
      setSelectedEdge(edge);
      setSelectedNode(undefined);
      setTippyTargetElement(event.target as Element);
    }
  };

  const onNodeClick: NodeClickCallback = (node, event) => {
    if (selectedNode?.id === node.id) {
      reset();
    } else {
      setSelectedEdge(undefined);
      setSelectedNode(node);
      setTippyTargetElement(event.target as Element);
    }
  };

  const getTippyProps = () => {
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
            dataPlacement: attrs['data-placement'],
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
  };

  return { name: 'Node Info Tool', reset, onEdgeClick, onNodeClick, getTippyProps };
};

export default usePopupInfoTool;
