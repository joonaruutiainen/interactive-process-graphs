import React from 'react';
import styled from 'styled-components';

const SPACING = '-6px';
const SIZE = '12px';

const BaseArrow = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  content: '';
`;

const ArrowDown = styled(BaseArrow)`
  bottom: ${SPACING};
  border-left: ${SIZE} solid transparent;
  border-right: ${SIZE} solid transparent;
  border-top: ${SIZE} solid black;
`;

const ArrowUp = styled(BaseArrow)`
  top: ${SPACING};
  border-left: ${SIZE} solid transparent;
  border-right: ${SIZE} solid transparent;
  border-bottom: ${SIZE} solid black;
`;

const ArrowLeft = styled(BaseArrow)`
  left: ${SPACING};
  border-top: ${SIZE} solid transparent;
  border-bottom: ${SIZE} solid transparent;
  border-right: ${SIZE} solid black;
`;

const ArrowRight = styled(BaseArrow)`
  right: ${SPACING};
  border-top: ${SIZE} solid transparent;
  border-bottom: ${SIZE} solid transparent;
  border-left: ${SIZE} solid black;
`;

interface ArrowMap {
  [direction: string]: typeof BaseArrow;
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
