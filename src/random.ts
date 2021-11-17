import { Graph } from './types/Graph';
import { Node } from './types/Node';
import { Edge } from './types/Edge';

type NodeRow = Node[];
const lastNode = (row: NodeRow): Node => row[row.length - 1];

export type ProcessNode = {
  id: number;
  type: string;
  nextNodes: number[];
  previousNodes: number[];
  description?: string;
};

export class RandomGraphGenerator {
  maxDepth: number;

  nInputNodes: number;

  chanceToSkip: number;

  chanceToMerge: number;

  chanceToSplit: number;

  constructor(maxDepth: number, nInputNodes: number, chanceToSkip = 0.2, chanceToMerge = 0.3, chanceToSplit = 0.1) {
    this.maxDepth = maxDepth;
    this.nInputNodes = nInputNodes;
    this.chanceToSkip = chanceToSkip;
    this.chanceToMerge = chanceToMerge;
    this.chanceToSplit = chanceToSplit;
  }

  generate(): Graph {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Generate vertical "rows" of nodes equal to nInputNodes
    let rows: NodeRow[] = [];
    for (let i = 0; i < this.nInputNodes; i++) {
      const node = { id: i, type: 'INPUT' };
      nodes.push(node);
      rows.push([node]);
    }

    // Traverse maxDepth columns
    for (let column = 1; column <= this.maxDepth; column++) {
      // Add a column of new nodes to each row
      rows = rows.flatMap((row, index, prevRows) => {
        const randomChance = Math.random();

        // Skip one node to make the row shorter
        if (randomChance <= this.chanceToSkip) {
          return [row];
        }

        // Merge with row above
        if (column > 1 && index > 0 && randomChance <= this.chanceToSkip + this.chanceToMerge / 2) {
          edges.push({ from: lastNode(row).id, to: lastNode(prevRows[index - 1]).id });
          return [];
        }

        // Merge with row below
        if (column > 1 && index < prevRows.length - 1 && randomChance <= this.chanceToSkip + this.chanceToMerge) {
          edges.push({ from: lastNode(row).id, to: lastNode(prevRows[index + 1]).id });
          return [];
        }

        // Split the row into two
        if (randomChance <= this.chanceToSkip + this.chanceToMerge + this.chanceToSplit) {
          const nodeA = { id: column * 100 + index, type: 'SPLIT' };
          const nodeB = { id: column * 10000 + index, type: 'SPLIT' };
          nodes.push(nodeA, nodeB);
          edges.push({ from: lastNode(row).id, to: nodeA.id }, { from: lastNode(row).id, to: nodeB.id });
          return [[...row, nodeA], [nodeB]];
        }

        // Just add a new node
        const node = { id: column * 100 + index, type: 'NEXT' };
        nodes.push(node);
        edges.push({ from: lastNode(row).id, to: node.id });
        return [row.concat([node])];
      });
    }

    return { nodes, edges };
  }
}
