import React from 'react';
import styled from 'styled-components';

const BaseArrow = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  content: '';
`;

const ArrowDown = styled(BaseArrow)`
  bottom: -8px;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 12px solid black;
`;

const ArrowUp = styled(BaseArrow)`
  top: -8px;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid black;
`;

interface ArrowProps {
  placement: string;
}

const Arrow: React.FC<ArrowProps> = ({ placement }) => {
  if (placement === 'bottom') {
    return <ArrowUp data-popper-arrow />;
  }
  return <ArrowDown data-popper-arrow />;
};

export default Arrow;
