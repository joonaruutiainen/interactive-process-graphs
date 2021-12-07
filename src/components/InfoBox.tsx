import React from 'react';
import styled from 'styled-components';
import { Icon } from 'ts-react-feather-icons';

const Box = styled.div`
  border: solid;
  border-color: ${props => props.theme.palette.secondary.main};
  border-radius: ${props => props.theme.borderRadius}px;
  position: absolute;
  padding: 10px;
  bottom: 50px;
  width: 500px;
  background-color: ${props => props.theme.palette.primary.main};
  right: 0;
  bottom: 1;
  margin: 13px 13px 8px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const CloseButton = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
  color: ${props => props.theme.palette.primary.text};
`;

const TitleText = styled.h3`
  padding: 0;
  margin: 0 0 10px 0;
  color: ${props => props.theme.palette.primary.text};
`;

const TextContainer = styled.div`
  overflow-wrap: break-word;
  font-family: ${props => props.theme.fontFamily};
  color: ${props => props.theme.palette.primary.text};
`;

interface InfoBoxProps {
  handleClose: () => void;
}

const InfoBox: React.FC<InfoBoxProps> = ({ handleClose }) => (
  <Box>
    <ButtonContainer>
      <TitleText>Instructions</TitleText>
      <CloseButton onClick={handleClose}>
        <Icon name='x-circle' size={20} />
      </CloseButton>
    </ButtonContainer>
    <TextContainer>
      Use tool chain buttons or mouse scroll wheel to zoom the canvas. <br />
      Move around the graph by grabbing the canvas and moving mouse. <br />
      <br />
      Info tool: View details of nodes and edges by clicking. <br />
      Selection tool: Select nodes by clicking, deselect by clicking again. <br />
      go win rush b
    </TextContainer>
  </Box>
);

export default InfoBox;
