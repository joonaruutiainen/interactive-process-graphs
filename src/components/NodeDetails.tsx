import React from 'react';
import styled from 'styled-components';
import { Node } from '../types/Node';

const Container = styled.div`
  border: solid;
  border-color: black;
  padding: 15px;
  margin: 5px;
  width: 250px;
  flex-wrap: wrap;
  background-color: white;
`;

const Text = styled.p`
  color: black;
`;

interface NodeDetailsProps {
  node: Node;
}

const NodeDetails: React.FC<NodeDetailsProps> = ({ node }) => (
  <Container>
    <Text>{node.type}</Text>
    <Text>{node.id}</Text>
    <Text>{node.description}</Text>
  </Container>
);

export default NodeDetails;
