import { Node } from './Node';
import { Edge } from './Edge';

export interface IParser<T> {
  (data: T): { nodes: Node[]; edges: Edge[] };
}
