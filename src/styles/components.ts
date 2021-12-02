import styled from 'styled-components';
import { lightTheme } from './themes';

const Button = styled.button`
  background-color: ${lightTheme.palette.primary.main};
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
