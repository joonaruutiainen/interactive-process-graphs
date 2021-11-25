import React from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../theme';
import ProcessGraphCanvas, { ProcessGraphProps } from './ProcessGraphCanvas';

const ProcessGraph: React.FC<ProcessGraphProps> = props => (
  <ThemeProvider theme={defaultTheme}>
    <ProcessGraphCanvas {...props} />
  </ThemeProvider>
);

export default ProcessGraph;
