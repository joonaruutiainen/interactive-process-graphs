import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TippyProps } from '@tippyjs/react';

import { Edge } from '../types/Edge';
import { Node } from '../types/Node';
import NodeDetails from '../components/NodeDetails';

type EdgeClickCallback = (edge: Edge, event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
type NodeClickCallback = (node: Node, event: React.MouseEvent<SVGGElement, MouseEvent>) => void;

export interface GraphTool {
  name: string;
  reset?: () => void;
  onEdgeClick?: EdgeClickCallback;
  onNodeClick?: NodeClickCallback;
  getTippyProps?: () => Pick<TippyProps, 'render' | 'reference' | 'visible'>;
}

const useGraphTools = (tools: GraphTool[]): [GraphTool, (tool: GraphTool) => void, GraphTool[]] => {
  if (tools.length === 0) {
    throw new Error('No graph tools provided');
  }

  const [activeToolName, setActiveToolName] = useState<string>(tools[0].name);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const activeTool = useMemo(() => tools.find(t => t.name === activeToolName)!, [tools, activeToolName]);
  const setActiveTool = useCallback(
    (tool: GraphTool) => {
      activeTool.reset?.();
      setActiveToolName(tool.name);
    },
    [activeTool]
  );

  return [activeTool, setActiveTool, tools];
};

export const useInfoTool = (): GraphTool => {
  const [selectedNode, setSelectedNode] = useState<Node | undefined>();
  const [tippyTargetElement, setTippyTargetElement] = useState<Element | undefined>();

  const reset = (): void => {
    setSelectedNode(undefined);
    setTippyTargetElement(undefined);
  };

  const onNodeClick: NodeClickCallback = (node, event) => {
    if (selectedNode?.id === node.id) {
      reset();
    } else {
      setSelectedNode(node);
      setTippyTargetElement(event.target as Element);
    }
  };

  const getTippyProps = () => {
    if (!selectedNode) {
      return {
        render: undefined,
        reference: undefined,
        visible: false,
      };
    }
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (attrs: any) =>
        React.createElement(NodeDetails, {
          node: selectedNode,
          dataPlacement: attrs['data-placement'],
        }),
      reference: tippyTargetElement,
      visible: true,
    };
  };

  return { name: 'Node Info Tool', reset, onNodeClick, getTippyProps };
};

export const useMultiselectTool = (onUpdate?: (nodes: Node[]) => void): GraphTool => {
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);

  const reset = (): void => {
    setSelectedNodes([]);
  };

  const onNodeClick: NodeClickCallback = node => {
    if (selectedNodes.find(n => n.id === node.id)) {
      setSelectedNodes(selectedNodes.filter(n => n.id !== node.id));
    } else {
      setSelectedNodes([...selectedNodes, node]);
    }
  };

  useEffect(() => {
    onUpdate?.(selectedNodes);
  }, [selectedNodes]);

  return { name: 'Multiselect Tool', reset, onNodeClick };
};

export default useGraphTools;
