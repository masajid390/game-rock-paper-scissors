import styled from "styled-components";
const Button = styled.button`
  color: ${({ theme }) => `${theme.colors.main}`};
  border: ${({ theme }) => `1px solid ${theme.colors.main}`};
  border-radius: ${({ theme }) => `${theme.borderRadius}`};
  background: transparent;
  padding: ${({ theme }) =>
    `${theme.gutterSpace}px ${theme.gutterSpace * 2}px`};
  text-transform: uppercase;
  outline: none;
  cursor: pointer;
`;

export { Button };
