import React from 'react';
import styled from 'styled-components';

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

interface NodeProps {
  id: number;
  // description: string;
  // type: string;
  // data;
}

const Node: React.FC<NodeProps> = ({ id }) => <ProcessBlock>{id}</ProcessBlock>;
export default Node;