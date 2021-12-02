import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import ProcessGraphCanvas, { ProcessGraphCanvasProps } from './ProcessGraphCanvas';

interface ProcessGraphProps extends ProcessGraphCanvasProps {
  theme: DefaultTheme;
}

const ProcessGraph: React.FC<ProcessGraphProps> = ({ theme, ...props }) => (
  <ThemeProvider theme={theme}>
    <ProcessGraphCanvas {...props} />
  </ThemeProvider>
);

export default ProcessGraph;
