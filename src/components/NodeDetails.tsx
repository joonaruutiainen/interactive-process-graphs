import React from 'react';
import styled from 'styled-components';
import { Icon } from 'ts-react-feather-icons';
import { Node } from '../types/Node';

const Container = styled.div`
  border: solid;
  border-color: grey;
  border-radius: 15px;
  padding: 10px;
  margin: 10px;
  width: 150px;
  flex-wrap: wrap;
  background-color: white;
`;

const TypeText = styled.h3`
  padding: 0;
  margin: 0 0 10px 0;
`;

const Text = styled.div`
  color: black;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: flex-end;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

interface NodeDetailsProps {
  node: Node;
}

const NodeDetails: React.FC<NodeDetailsProps> = ({ node }) => (
  <Container>
    <ButtonContainer>
      <Button>
        <Icon name='x-circle' size={20} />
      </Button>
    </ButtonContainer>
    <TypeText>{node.type}</TypeText>
    <Text> id {node.id}</Text>
    <Text> description {node.description}</Text>
  </Container>
);

export default NodeDetails;
