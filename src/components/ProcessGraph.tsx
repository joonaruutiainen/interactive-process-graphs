import React from 'react';
import styled from 'styled-components';

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
  <Container>
    {nodes.map(node => <ExampleItem>{node}</ExampleItem>)}
  </Container>
);

export default ProcessGraph;
