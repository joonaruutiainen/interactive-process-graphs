import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../styles/themes';
import ProcessGraphCanvas, { ProcessGraphProps } from './ProcessGraphCanvas';

const ProcessGraph: React.FC<ProcessGraphProps> = props => (
  <ThemeProvider theme={lightTheme}>
    <ProcessGraphCanvas {...props} />
  </ThemeProvider>
);

export default ProcessGraph;
