import React from 'react';
import ReactDOM from 'react-dom';
import ProcessGraph from './ProcessGraph';

describe('ProcessGraph component', () => {
  describe('with two nodes', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<ProcessGraph nodes={['node1', 'node2']} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
