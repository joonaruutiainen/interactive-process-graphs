import React, { useCallback, useMemo, useState } from 'react';
import { TippyProps } from '@tippyjs/react';

import { Edge } from '../../types/Edge';
import { Node } from '../../types/Node';

/**
 * Callback for handling an edge click.
 * @param edge Edge that was clicked.
 * @param event The mouse click event.
 */
export type EdgeClickCallback = (edge: Edge, event: React.MouseEvent<SVGGElement, MouseEvent>) => void;

/**
 * Callback for handling a node click.
 * @param node Node that was clicked.
 * @param event The mouse click event.
 */
export type NodeClickCallback = (node: Node, event: React.MouseEvent<SVGGElement, MouseEvent>) => void;

export interface GraphTool {
  /**
   * Unique name used to identify the graph tool with.
   */
  name: string;

  /**
   * Icon to display for the graph tool.
   * The icon size should be defined to ensure the icon gets rendered properly.
   * Default buttons are sized 24x24 px.
   */
  icon: React.ReactElement;

  /**
   * Reset callback handler.
   * Should reset the tool to its neutral stage.
   */
  reset?: () => void;

  /**
   * Handler for an edge being clicked.
   */
  onEdgeClick?: EdgeClickCallback;

  /**
   * Handler for a node being clicked.
   */
  onNodeClick?: NodeClickCallback;

  /**
   * Callback for receiving TippyProps for the tool.
   */
  getTippyProps?: () => Pick<TippyProps, 'render' | 'reference' | 'visible'>;
}

/**
 * Hook for switching between multiple tools in a toolbar.
 * @param tools List of all tools in the toolbar.
 * @returns [activeTool, setActiveTool, allTools]
 */
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
