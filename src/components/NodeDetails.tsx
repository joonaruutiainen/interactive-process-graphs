import React from 'react';
import styled from 'styled-components';
import { Node } from '../types/Node';

const Container = styled.div`
  border-radius: ${props => props.theme.borderRadius};
  padding: 15px;
  margin: 5px;
  width: 250px;
  flex-wrap: wrap;
  background-color: ${props => props.theme.palette.common.white};
`;

const Text = styled.p`
  color: ${props => props.theme.palette.common.black};
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
