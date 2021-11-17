import { Node } from './Node';
import { Edge } from './Edge';

export interface Graph {
  name?: string;
  nodes: Node[];
  edges: Edge[];
}