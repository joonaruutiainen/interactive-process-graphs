import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../theme';
import ProcessGraphCanvas from './ProcessGraphCanvas';
import { Edge } from '../types/Edge';
import { Node } from '../types/Node';

Element.prototype.scrollTo = jest.fn();

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

afterEach(cleanup);

describe('ProcessGraph component', () => {
  describe('with two nodes', () => {
    it('renders without crashing', () => {
      render(
        <ThemeProvider theme={defaultTheme}>
          <ProcessGraphCanvas nodes={testNodes} edges={testEdges} width={100} height={100} />
        </ThemeProvider>
      );
    });
  });
});
