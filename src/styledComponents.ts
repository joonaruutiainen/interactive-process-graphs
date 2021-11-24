import styled from 'styled-components';
import theme from './theme';

const Button = styled.button`
background-color: ${theme.palette.common.white};
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
