import React from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../theme';
import ProcessGraphCanvas, { ProcessGraphProps } from './ProcessGraphCanvas';

const ProcessGraph: React.FC<ProcessGraphProps> = ({ nodes, edges, hideZoomButtons = false }) => (
  <ThemeProvider theme={defaultTheme}>
    <ProcessGraphCanvas nodes={nodes} edges={edges} hideZoomButtons />
  </ThemeProvider>
);

export default ProcessGraph;
