import React from 'react';
import styled from 'styled-components';
import { Icon } from 'ts-react-feather-icons';
import { Placement } from 'tippy.js';
import { Node } from '../types/Node';
import Arrow from './Arrow';

const Container = styled.div`
  border: solid;
  border-color: grey;
  border-radius: 15px;
  padding: 5px;
  margin: 10px;
  width: 150px;
  flex-wrap: wrap;
  background-color: white;
`;

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TypeText = styled.h3`
  padding: 0;
  margin: 0 0 10px 0;
`;

const Text = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: black;
  margin-left: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-end;
  height: 65px;
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
  dataPlacement: Placement;
  onClose?: () => void;
}

const NodeDetails: React.FC<NodeDetailsProps> = ({ node, dataPlacement, onClose = undefined }) => (
  <Container>
    <FirstRow>
      <TypeText>{node.type}</TypeText>
      {onClose && (
        <ButtonContainer>
          <Button onClick={onClose}>
            <Icon name='x-circle' size={17} />
          </Button>
        </ButtonContainer>
      )}
    </FirstRow>
    <Text> id {node.id}</Text>
    <Text> description {node.description}</Text>
    <Arrow placement={dataPlacement} />
  </Container>
);

export default NodeDetails;
