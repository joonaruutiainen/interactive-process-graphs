import React from 'react';
import styled from 'styled-components';
import { Node } from '../types/Node';

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

interface ProcessGraphProps {
  nodes: Node[];
}

const ProcessGraph: React.FC<ProcessGraphProps> = ({ nodes }) => (
  <Container>
    {nodes.map(node => (
      <ExampleItem key={node.id}>{node.description}</ExampleItem>
    ))}
  </Container>
);

export default ProcessGraph;
