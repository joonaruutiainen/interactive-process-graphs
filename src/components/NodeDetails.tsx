import React from 'react';
import styled from 'styled-components';
import { Icon } from 'ts-react-feather-icons';
import { Placement } from 'tippy.js';
import { Node } from '../types/Node';
import Arrow from './Arrow';
import dogIcon from '../icons/dog.svg';

const CLOSE_BUTTON_SIZE = 20;

const Container = styled.div`
  border: solid;
  border-color: ${props => props.theme.palette.secondary.main};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: 10px;
  margin: 10px;
  width: 230px;
  flex-wrap: wrap;
  background-color: ${props => props.theme.palette.common.white};
`;

const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-bottom: 10px;
`;

const Spacer = styled.span`
  flex: 1 1 auto;
`;

const DataContainer = styled.div`
  overflow-y: auto;
  max-height: 150px;
`;

const Title = styled.h3`
  padding: 0;
  margin: 0;
  font-family: ${props => props.theme.fontFamily};
`;

const Text = styled.div`
  margin: 0;
  padding: 0;
  color: ${props => props.theme.palette.common.black};
  font-family: ${props => props.theme.fontFamily};
`;

const Desc = styled.span`
  text-align: justify;
  text-justify: inter-word;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: start;
`;

const Button = styled.div`
  height: ${CLOSE_BUTTON_SIZE}px;
  width: ${CLOSE_BUTTON_SIZE}px;
  &:hover {
    cursor: pointer;
  }
`;

interface NodeDetailsProps {
  node: Node;
  dataPlacement: Placement;
  onClose?: () => void;
  iconSize?: number;
}

const NodeDetails: React.FC<NodeDetailsProps> = ({ node, dataPlacement, iconSize = 40, onClose = undefined }) => {
  const { id, type, description, data } = node;

  return (
    <Container>
      <FirstRow>
        <img
          src={dogIcon}
          style={{ width: `${iconSize}px`, height: `${iconSize}px`, margin: '10px' }}
          alt={`${type}icon`}
        />
        <Text>
          <Title>
            {type} {id}
          </Title>
          <Desc>{description}</Desc>
        </Text>
        <Spacer />
        <ButtonContainer>
          <Button onClick={onClose}>
            <Icon name='x-circle' size={CLOSE_BUTTON_SIZE} />
          </Button>
        </ButtonContainer>
      </FirstRow>
      <DataContainer>
        {data &&
          Object.entries(data).map(([key, value]) => (
            <Text key={key}>
              {key}: {JSON.stringify(value)}
            </Text>
          ))}
      </DataContainer>
      <Arrow placement={dataPlacement} />
    </Container>
  );
};

export default NodeDetails;
