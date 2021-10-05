import React from 'react';
import ReactDOM from 'react-dom';
import Node from './Node';

describe('Node component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Node id={1} type='pipe' description='pipe from A to B' nextNodes={[1, 2]} previousNodes={[3]} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
