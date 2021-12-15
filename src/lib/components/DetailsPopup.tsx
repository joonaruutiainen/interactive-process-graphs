import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Icon } from 'ts-react-feather-icons';
import { Placement } from 'tippy.js';
import yaml from 'js-yaml';

import Arrow from './Arrow';
import { Edge } from '../types/Edge';
import { Node, NodeDataFormat } from '../types/Node';

const CLOSE_BUTTON_SIZE = 20;

const Container = styled.div`
  border: solid;
  border-color: ${props => props.theme.palette.secondary.main};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: 10px;
  margin: 10px;
  min-width: 200px;
  max-width: 300px;
  flex-wrap: wrap;
  background-color: ${props => props.theme.palette.primary.main};
`;

const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const Spacer = styled.span`
  flex: 1 1 auto;
`;

const DataTextarea = styled.textarea`
  width: 100%;
  margin-top: 10px;
  background-color: ${props => props.theme.palette.primary.main};
  color: ${props => props.theme.palette.primary.text};
  font-family: ${props => props.theme.fontFamily};
  border: 0;
  resize: none;
`;

const Title = styled.h3`
  padding: 0;
  margin: 0;
  font-family: ${props => props.theme.fontFamily};
`;

const Text = styled.div`
  margin: 0;
  padding: 0;
  color: ${props => props.theme.palette.primary.text};
  font-family: ${props => props.theme.fontFamily};
`;

const Desc = styled.span`
  text-align: justify;
  text-justify: inter-word;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: start;
  margin-left: 10px;
`;

const Button = styled.div`
  height: ${CLOSE_BUTTON_SIZE}px;
  width: ${CLOSE_BUTTON_SIZE}px;
  &:hover {
    cursor: pointer;
  }
  color: ${props => props.theme.palette.primary.text};
`;

interface DetailsPopupProps {
  dataPlacement: Placement;
  onClose?: () => void;
}

interface EdgeDetailsPopupProps extends DetailsPopupProps {
  edge: Edge;
}

export const EdgeDetailsPopup: React.FC<EdgeDetailsPopupProps> = ({ edge, dataPlacement, onClose = undefined }) => {
  const { from, to } = edge;

  return (
    <Container>
      <FirstRow>
        <Text>
          Edge from {from} to {to}
        </Text>
        <Spacer />
        <ButtonContainer>
          <Button onClick={onClose}>
            <Icon name='x-circle' size={CLOSE_BUTTON_SIZE} />
          </Button>
        </ButtonContainer>
      </FirstRow>
      <Arrow placement={dataPlacement} />
    </Container>
  );
};

interface NodeDetailsPopupProps extends DetailsPopupProps {
  node: Node;
  icon?: string;
  iconSize?: number;
  textFormat?: NodeDataFormat;
}

export const NodeDetailsPopup: React.FC<NodeDetailsPopupProps> = ({
  node,
  dataPlacement,
  iconSize = 70,
  icon,
  textFormat = 'json',
  onClose = undefined,
}) => {
  const { id, type, description, data } = node;

  const dataString: string = useMemo(() => {
    let str;
    const indentation = 4;

    if (textFormat === 'json') {
      str = JSON.stringify(data, undefined, indentation);
      if (str) {
        str = str
          // remove newlines from start and end
          .substring(2, str.length - 2)
          // also remove spaces from the start of every row
          .split(/\n/)
          .map(row => row.substring(indentation, row.length))
          .join('\n');
      }
      return str;
    }

    str = yaml.dump(data, { indent: indentation });
    // remove newline at the end of yaml formatted text
    str = str.substring(0, str.length - 1);
    return str;
  }, [data]);

  const rowCount = (str: string): number => str.split(/\r?\n/).length;

  return (
    <Container>
      <FirstRow>
        {icon && (
          <img
            src={icon}
            style={{ width: `${iconSize}px`, height: `${iconSize}px`, marginRight: '10px' }}
            alt={`${type}icon`}
          />
        )}
        <Text>
          <Title>
            {type.length > 20 ? `${type.substring(0, 19)}...` : type} {id}
          </Title>
          {description && <Desc>{description.length > 60 ? `${description.substring(0, 59)}...` : description}</Desc>}
        </Text>
        <Spacer />
        <ButtonContainer>
          <Button onClick={onClose}>
            <Icon name='x-circle' size={CLOSE_BUTTON_SIZE} />
          </Button>
        </ButtonContainer>
      </FirstRow>
      {data && <DataTextarea value={dataString} readOnly rows={Math.min(rowCount(dataString), 8)} />}
      <Arrow placement={dataPlacement} />
    </Container>
  );
};
