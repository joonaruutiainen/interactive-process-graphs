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
  justify-content: end;
  align-items: flex-end;
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
      <CloseButton onClick={handleClose}>
        <Icon name='x-circle' size={20} />
      </CloseButton>
    </ButtonContainer>
    <TitleText>Instructions</TitleText>
    <TextContainer>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
      type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
      remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
      Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
    </TextContainer>
  </Box>
);

export default InfoBox;
