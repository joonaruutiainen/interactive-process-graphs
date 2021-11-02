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

const ArrowLeft = styled(BaseArrow)`
  left: -8px;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-right: 12px solid black;
`;

const ArrowRight = styled(BaseArrow)`
  right: -8px;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-left: 12px solid black;
`;

interface ArrowMap {
  [key: string]: typeof BaseArrow;
}

const components: ArrowMap = {
  t: ArrowDown,
  b: ArrowUp,
  l: ArrowRight,
  r: ArrowLeft,
};

interface ArrowProps {
  placement: string;
}

const Arrow: React.FC<ArrowProps> = ({ placement }) => {
  if (placement === undefined) return <ArrowDown data-popper-arrow />;
  const direction = placement.substring(0, 1);
  const Component = components[direction] || components.b;
  return <Component data-popper-arrow />;
};

export default Arrow;
