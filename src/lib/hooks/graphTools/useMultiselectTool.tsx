import React, { useState, useCallback } from 'react';
import { Icon } from 'ts-react-feather-icons';

import { GraphTool, NodeClickCallback } from './useGraphTools';
import { Node } from '../../types/Node';

/**
 * Tool that allows you to click and select multiple nodes at once.
 * @param onUpdate Callback for when the selection has changed.
 * @returns GraphTool
 */
const useMultiselectTool = (onUpdate?: (nodes: Node[]) => void): GraphTool => {
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);

  const reset: () => void = useCallback(() => {
    setSelectedNodes([]);
    onUpdate?.([]);
  }, [onUpdate]);

  const onNodeClick: NodeClickCallback = useCallback(
    node => {
      let nodes: Node[];
      if (selectedNodes.find(n => n.id === node.id)) {
        nodes = selectedNodes.filter(n => n.id !== node.id);
      } else {
        nodes = [...selectedNodes, node];
      }
      setSelectedNodes(nodes);
      onUpdate?.(nodes);
    },
    [selectedNodes, onUpdate]
  );

  return { name: 'Multiselect Tool', icon: <Icon name='check-square' />, reset, onNodeClick };
};

export default useMultiselectTool;
