import React from 'react';
import styled from 'styled-components';
import { Placement } from 'tippy.js';
import { Node } from '../types/Node';
import Arrow from './Arrow';

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
  dataPlacement: Placement;
}

const NodeDetails: React.FC<NodeDetailsProps> = ({ node, dataPlacement }) => (
  <Container>
    <Text>{node.type}</Text>
    <Text>{node.id}</Text>
    <Text>{node.description}</Text>
    <Arrow placement={dataPlacement} />
  </Container>
);

export default NodeDetails;
