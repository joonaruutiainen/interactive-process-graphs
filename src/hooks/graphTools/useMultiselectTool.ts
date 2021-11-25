import { useState, useEffect } from 'react';

import { GraphTool, NodeClickCallback } from './useGraphTools';
import { Node } from '../../types/Node';

const useMultiselectTool = (onUpdate?: (nodes: Node[]) => void): GraphTool => {
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

export default useMultiselectTool;
