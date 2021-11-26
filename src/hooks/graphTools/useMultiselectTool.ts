import { useState, useCallback } from 'react';

import { GraphTool, NodeClickCallback } from './useGraphTools';
import { Node } from '../../types/Node';

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

  return { name: 'Multiselect Tool', reset, onNodeClick };
};

export default useMultiselectTool;
