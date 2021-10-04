import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: solid;
`;

const Text = styled.p``;

interface Props {
  nodes: {
    name: string;
    id: number;
    desc: string;
  };
}

// Määrittele laatikolle vakio koko.

const NodeDetails: React.FC<Props> = ({ nodes }) => (
  <Container>
    <Text>{nodes.name}</Text>
    <Text>{nodes.id}</Text>
    <Text>{nodes.desc}</Text>
  </Container>
);

export default NodeDetails;
