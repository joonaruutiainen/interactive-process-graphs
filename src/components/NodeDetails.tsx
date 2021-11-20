import React from 'react';
import styled from 'styled-components';
import { Icon } from 'ts-react-feather-icons';
import { Placement } from 'tippy.js';
import { Node } from '../types/Node';
import Arrow from './Arrow';

const Container = styled.div`
  border: solid;
  border-color: ${props => props.theme.palette.secondary.main};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: 10px;
  margin: 10px;
  width: 150px;
  flex-wrap: wrap;
  background-color: ${props => props.theme.palette.common.white};
`;

const TypeText = styled.h3`
  padding: 0;
  margin: 0 0 10px 0;
  font-family: ${props => props.theme.fontFamily};
`;

const Text = styled.p`
  color: ${props => props.theme.palette.common.black};
  font-family: ${props => props.theme.fontFamily};
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
  dataPlacement: Placement;
}

const NodeDetails: React.FC<NodeDetailsProps> = ({ node, dataPlacement }) => (
  <Container>
    <ButtonContainer>
      <Button>
        <Icon name='x-circle' size={20} />
      </Button>
    </ButtonContainer>
    <TypeText>{node.type}</TypeText>
    <Text> id {node.id}</Text>
    <Text> description {node.description}</Text>
    <Arrow placement={dataPlacement} />
  </Container>
);

export default NodeDetails;
