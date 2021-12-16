import { Node } from './Node';
import { Edge } from './Edge';

export interface IParser<T> {
  /**
   * @param data Data to parse.
   * @returns { nodes: Node[], edges: Edge[] } Parsed graph.
   */
  (data: T): { nodes: Node[]; edges: Edge[] };
}
