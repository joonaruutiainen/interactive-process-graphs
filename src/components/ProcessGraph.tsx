import React from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/theme';
import ProcessGraphCanvas, { ProcessGraphProps } from './ProcessGraphCanvas';

const ProcessGraph: React.FC<ProcessGraphProps> = ({
  nodes,
  edges,
  selectableNodes = true,
  onSelectNodes = undefined,
  hideZoomButtons = false,
  iconSize = 30,
  width,
  height,
  icons,
}) => (
  <ThemeProvider theme={defaultTheme}>
    <ProcessGraphCanvas
      nodes={nodes}
      edges={edges}
      selectableNodes={selectableNodes}
      onSelectNodes={onSelectNodes}
      hideZoomButtons={hideZoomButtons}
      iconSize={iconSize}
      width={width}
      height={height}
      icons={icons}
    />
  </ThemeProvider>
);

export default ProcessGraph;
