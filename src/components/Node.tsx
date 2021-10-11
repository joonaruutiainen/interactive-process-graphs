import React from 'react';
import styled from 'styled-components';
import { Node as NodeProps } from '../types/Node';

const ProcessBlock = styled.div`
  background-color: lightblue;
  color: ${({ color }) => color || 'black'};
  padding: 20px;
  border: 1px solid ${({ color }) => color || 'blue'};
  display: inline-block;
  margin: 10px;
  cursor: pointer;
  height: 10px;
  width: 25px;
`;

const Node: React.FC<NodeProps> = ({ id, type, description }) => (
  <ProcessBlock>
    <div>{id}</div>
    <div>{type}</div>
    <div>{description}</div>
  </ProcessBlock>
);
export default Node;
