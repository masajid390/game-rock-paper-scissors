import { FC } from "react";
import styled from "styled-components";
const Button = styled.button`
  color: ${({ theme }) => `${theme.colors.main}`};
  border: ${({ theme }) => `1px solid ${theme.colors.main}`};
  border-radius: ${({ theme }) => `${theme.borderRadius}`};
  background: transparent;
  padding: ${({ theme }) =>
    `${theme.gutterSpace}px ${theme.gutterSpace * 4}px`};
  text-transform: uppercase;
  outline: none;
  cursor: pointer;
`;

interface IconButtonContainerProps {
  size: number;
  gradientFromColor: string;
  gradientToColor: string;
  border: number;
}
const IconButtonContainer = styled("div")<IconButtonContainerProps>`
  ${({ size, gradientFromColor, gradientToColor, border }) => {
    const shadow = border / 2.5;
    return `
      width: ${size}px;
      height: ${size}px;
      align-items: center;
      justify-content: center;
      display: flex;
      border-radius: 50%;
      border: ${border}px solid ${gradientToColor};
      border-bottom: ${border - shadow}px solid ${gradientToColor};
      background: white;
      box-shadow: 0 ${shadow}px ${gradientFromColor}, inset 0 ${shadow}px lightgrey;
      cursor: pointer;
      user-select: none;
  `;
  }}
`;

export interface IconButtonProps extends IconButtonContainerProps {
  iconSrc: string;
}
const IconButton: FC<IconButtonProps> = ({
  size,
  gradientFromColor,
  gradientToColor,
  iconSrc,
  border,
}) => (
  <IconButtonContainer
    size={size}
    gradientFromColor={gradientFromColor}
    gradientToColor={gradientToColor}
    border={border}
  >
    <img src={iconSrc} />
  </IconButtonContainer>
);
export { Button, IconButton };
