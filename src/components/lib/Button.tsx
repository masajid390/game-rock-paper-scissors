import { FC } from "react";
import styled, { DefaultTheme } from "styled-components";
const Button = styled("button")<{
  color?: string;
  background?: string;
  theme: DefaultTheme;
}>`
  ${({ color, background, theme }) => {
    const colorKeys = Object.keys(theme.colors);
    if (color && colorKeys.includes(color)) {
      color = theme.colors[color];
    }
    if (background && colorKeys.includes(background)) {
      background = theme.colors[background];
    }
    return `
      color: ${color ?? theme.colors.main};
      border: 1px solid ${theme.colors.main};
      border-radius:${theme.borderRadius};
      background: ${background ?? "transparent"};
      padding: ${theme.gutterSpace}px ${theme.gutterSpace * 4}px;
      text-transform: uppercase;
      outline: none;
      cursor: pointer;
      letter-spacing: 1.5px;
      font-size: 12px;
      font-weight: bold;
    `;
  }}
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
  imgAlt?: string;
}
const IconButton: FC<IconButtonProps> = ({
  size,
  gradientFromColor,
  gradientToColor,
  iconSrc,
  border,
  imgAlt,
}) => (
  <IconButtonContainer
    size={size}
    gradientFromColor={gradientFromColor}
    gradientToColor={gradientToColor}
    border={border}
  >
    <img src={iconSrc} alt={imgAlt} />
  </IconButtonContainer>
);
export { Button, IconButton };
