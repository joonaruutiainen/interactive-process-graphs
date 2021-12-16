import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import ProcessGraphCanvas, { ProcessGraphCanvasProps } from './ProcessGraphCanvas';

export interface ProcessGraphProps extends ProcessGraphCanvasProps {
  /**
   * Theme used to style the process graph with.
   */
  theme: DefaultTheme;
}

/**
 * When Reaflow is updated to use ELKjs 0.7.3 (currently 0.7.1) remove this
 * @see https://github.com/kieler/elkjs/issues/127
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.g = null;

const ProcessGraph: React.FC<ProcessGraphProps> = ({ theme, ...props }) => (
  <ThemeProvider theme={theme}>
    <ProcessGraphCanvas {...props} />
  </ThemeProvider>
);

export default ProcessGraph;
