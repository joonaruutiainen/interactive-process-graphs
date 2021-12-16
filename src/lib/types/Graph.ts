import { Node } from './Node';
import { Edge } from './Edge';

export interface Graph {
  /**
   * Name of the graph, if any.
   */
  name?: string;

  /**
   * List of nodes in the graph.
   */
  nodes: Node[];

  /**
   * List of edges in the graph.
   */
  edges: Edge[];
}
