import { Node } from './types/Node';
import { Edge } from './types/Edge';

export interface IParser<T> {
  // eslint-disable-next-line no-unused-vars
  (data: T): { nodes: Node[]; edges: Edge[] };
}

type DefaultNode = {
  id: number;
  type: string;
  description: string;
  nextNodes: number[];
  previousNodes: number[];
  data?: Record<string, unknown>;
};

type DefaultData = {
  name: string;
  nodes: DefaultNode[];
};

const defaultParser: IParser<DefaultData> = data => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  data.nodes.forEach((node: DefaultNode) => {
    nodes.push({
      id: node.id,
      type: node.type,
      description: node.description,
      data: node.data,
    });
    node.nextNodes.forEach((next: number) => {
      edges.push({
        from: node.id,
        to: next,
      });
    });
  });
  return { nodes, edges };
};

export default defaultParser;
