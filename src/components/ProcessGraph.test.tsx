import React from 'react';
import ReactDOM from 'react-dom';
import ProcessGraph from './ProcessGraph';
import { Edge } from '../types/Edge';
import { Node } from '../types/Node';

const testNodes: Node[] = [
  {
    id: 1,
    type: 'aa',
  },
  {
    id: 2,
    type: 'bee',
  },
];

const testEdges: Edge[] = [
  {
    from: 1,
    to: 2,
  },
];

describe('ProcessGraph component', () => {
  describe('with two nodes', () => {
    it('renders without crashing', () => {
      // const div = document.createElement('div');
      // ReactDOM.render(<ProcessGraph nodes={testNodes} edges={testEdges} />, div);
      // ReactDOM.unmountComponentAtNode(div);
    });
  });
});
