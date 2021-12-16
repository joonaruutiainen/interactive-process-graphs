export interface Node {
  /**
   * Unique ID for the node.
   */
  id: number;

  /**
   * Type of the node.
   * The type is also used to to determine the node's icon.
   */
  type: string;

  /**
   * A short description for the node.
   */
  description?: string;

  /**
   * Arbitary data of key-value pairs for the node.
   * Each node can contain any user defined data.
   */
  data?: Record<string, unknown>;
}

export type NodeDataFormat = 'json' | 'yaml';
