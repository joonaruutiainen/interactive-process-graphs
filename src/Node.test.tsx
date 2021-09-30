import React from 'react';
import ReactDOM from 'react-dom';
import Node from './Node';

describe('Node component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Node id={1} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
