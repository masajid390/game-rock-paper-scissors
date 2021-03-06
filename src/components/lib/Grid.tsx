import styled, { css } from "styled-components";

interface FlexProps {
  justifyContent?: string;
  alignItems?: string;
}

const Column = styled("div")<FlexProps>`
  display: flex;
  flex-direction: column;
  height: 100%;
  ${({ justifyContent }) =>
    justifyContent &&
    css`
      justify-content: ${justifyContent};
    `}
  ${({ alignItems }) =>
    alignItems &&
    css`
      align-items: ${alignItems};
    `}
`;

const Row = styled("div")<FlexProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
  ${({ justifyContent }) =>
    justifyContent &&
    css`
      justify-content: ${justifyContent};
    `}
  ${({ alignItems }) =>
    alignItems &&
    css`
      align-items: ${alignItems};
    `}
`;

export { Column, Row };
