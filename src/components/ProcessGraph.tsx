import React from 'react';
import styled from 'styled-components';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const ZoomButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: calc(100vw - 60px);
  margin-bottom: 10px;
  button {
    margin-left: 10px;
    width: 2em;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ExampleItem = styled.div`
  color: white;
  background-color: black;
  font-weight: bold;
  margin: 4px;
`;

interface Props {
  nodes: string[];
}

const ProcessGraph: React.FC<Props> = ({ nodes }) => (
  <TransformWrapper initialScale={1} minScale={0.8} maxScale={10}>
    {({ zoomIn, zoomOut, resetTransform }) => (
      <>
        <ZoomButtons>
          <button type='button' onClick={() => zoomIn()}>
            +
          </button>
          <button type='button' onClick={() => zoomOut()}>
            -
          </button>
          <button type='button' onClick={() => resetTransform()}>
            x
          </button>
        </ZoomButtons>
        <TransformComponent>
          <Container>
            {nodes.map(node => (
              <ExampleItem key={node}>{node}</ExampleItem>
            ))}
          </Container>
        </TransformComponent>
      </>
    )}
  </TransformWrapper>
);

export default ProcessGraph;
