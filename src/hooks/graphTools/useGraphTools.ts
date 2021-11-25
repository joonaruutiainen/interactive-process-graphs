import React, { useCallback, useMemo, useState } from 'react';
import { TippyProps } from '@tippyjs/react';

import { Edge } from '../../types/Edge';
import { Node } from '../../types/Node';

export type EdgeClickCallback = (edge: Edge, event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
export type NodeClickCallback = (node: Node, event: React.MouseEvent<SVGGElement, MouseEvent>) => void;

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

export default useGraphTools;
