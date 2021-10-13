import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: solid;
  border-color: black;
  padding: 15px;
  margin: 5px;
  width: 250px;
  flex-wrap: wrap;
`;

const Text = styled.p`
  color: black;
`;

interface Props {
  nodes: {
    name: string;
    id: number;
    desc: string;
  };
}

const NodeDetails: React.FC<Props> = ({ nodes }) => (
  <Container>
    <Text>{nodes.name}</Text>
    <Text>{nodes.id}</Text>
    <Text>{nodes.desc}</Text>
  </Container>
);

export default NodeDetails;
