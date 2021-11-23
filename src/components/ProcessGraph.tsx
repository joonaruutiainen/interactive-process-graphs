import React from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../theme';
import ProcessGraphCanvas, { ProcessGraphProps } from './ProcessGraphCanvas';

const ProcessGraph: React.FC<ProcessGraphProps> = ({
  nodes,
  edges,
  disableSelections = false,
  onSelectNodes = undefined,
  onSelectEdges = undefined,
  onNodeClick = undefined,
  onEdgeClick = undefined,
  hideZoomButtons = false,
  iconSize = 30,
}) => (
  <ThemeProvider theme={defaultTheme}>
    <ProcessGraphCanvas
      nodes={nodes}
      edges={edges}
      disableSelections={disableSelections}
      onSelectNodes={onSelectNodes}
      onSelectEdges={onSelectEdges}
      onNodeClick={onNodeClick}
      onEdgeClick={onEdgeClick}
      hideZoomButtons={hideZoomButtons}
      iconSize={iconSize}
    />
  </ThemeProvider>
);

export default ProcessGraph;
