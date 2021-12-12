export interface Node {
  id: number;
  type: string;
  description?: string;
  data?: Record<string, unknown>;
}

export type NodeDataFormat = 'json' | 'yaml';
