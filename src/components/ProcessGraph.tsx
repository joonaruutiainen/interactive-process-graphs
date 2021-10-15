import React from 'react';
import styled from 'styled-components';
import NodeDetails from './NodeDetails';

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

const esimerkki = {
  name: 'Tähän tulee nimi : nimi',
  id: 0,
  desc: 'Tähän tulee kuvaus : kuvaus. Tää on vielä kesken.',
};

const ProcessGraph: React.FC<Props> = ({ nodes }) => (
  <Container>
    {nodes.map(node => (
      <ExampleItem key={node}>{node}</ExampleItem>
    ))}
    <NodeDetails nodes={esimerkki} />
  </Container>
);

export default ProcessGraph;
