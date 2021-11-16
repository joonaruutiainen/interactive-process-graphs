import React from 'react';
import styled from 'styled-components';
import { Icon } from 'ts-react-feather-icons';

const Box = styled.div`
  border: solid;
  border-color: grey;
  border-radius: 15px;
  position: absolute;
  padding: 10px;
  bottom: 50px;
  width: 500px;
  left: 75%;
  flex-wrap: wrap;
  background-color: white;
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
`;

interface InfoBoxProps {
  info: string;
  handleClose: () => void;
}

const InfoBox: React.FC<InfoBoxProps> = ({ info, handleClose }) => (
  <Box>
    <ButtonContainer>
      <CloseButton onClick={handleClose}>
        <Icon name='x-circle' size={20} />
      </CloseButton>
    </ButtonContainer>
    {info}
  </Box>
);

export default InfoBox;
