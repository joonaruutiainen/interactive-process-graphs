import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.theme.palette.primary.main};
  color: ${props => props.theme.palette.primary.text};
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
  text-align: center;
  padding: 5px 6px;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

export default Button;
