import { FC } from "react";
import { down } from "styled-breakpoints";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsla(229, 25%, 31%, 0.5);
  ${down("xs")} {
    background: ${({ theme: { colors } }) => `${colors.main}`};
  }
`;

interface ModalProps {
  children: JSX.Element;
}
const Modal: FC<ModalProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export { Modal };
