import { FC } from "react";
import styled from "styled-components";

interface GradientColor {
  start: string;
  end: string;
}

const Box = styled("div")<{
  size: number;
  gradient?: GradientColor;
  zIndex: number;
  top?: number;
  left?: number;
  parent?: boolean;
}>`
  ${({ size, gradient, zIndex, top, left, parent }) => `
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  background-image: radial-gradient(
    circle,
    ${gradient?.start},
    ${gradient?.end}
  );
  z-index: ${zIndex};
  top: ${top}px;
  left: ${left}px;
  position:${parent ? "relative" : "absolute"};
`}
`;

interface WaveBoxProps {
  gradients: GradientColor[];
  radius: number;
  stepHeight: number;
}
const WaveBox: FC<WaveBoxProps> = ({ gradients, radius, stepHeight }) => {
  const size = radius + gradients.length * stepHeight;
  return (
    <Box size={size} zIndex={0} parent={true}>
      {gradients.map((gradient, index) => {
        const childSize = radius + (index + 1) * stepHeight;
        const spaceAround = (size - childSize) / 2;
        return (
          <Box
            key={index}
            size={childSize}
            gradient={gradient}
            zIndex={gradients.length - index}
            top={spaceAround}
            left={spaceAround}
          />
        );
      })}
    </Box>
  );
};

export { WaveBox };
