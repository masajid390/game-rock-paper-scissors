import { FC } from "react";
import { CloseIcon } from "../lib/icons";
import { down } from "styled-breakpoints";
import styled from "styled-components";
import TriangleRules from "../../assets/game/triangle_rules.svg";

const Container = styled.div`
  ${({ theme: { colors, gutterSpace, borderRadius } }) => `
    background: ${colors.main};
    padding: ${gutterSpace * 4}px;
    border-radius: ${borderRadius};
`}
`;

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme: { gutterSpace } }) => `${gutterSpace * 3}px`};
  ${down("xs")} {
    justify-content: center;
    margin-bottom: ${({ theme: { gutterSpace } }) => `${gutterSpace * 10}px`};
  }
`;

const Heading = styled.div`
  ${({ theme: { colors } }) => `
    color: ${colors.secondary};
    font-size: 26px;
    font-weight: bold;
`}
`;

const CloseButton = styled.div`
  cursor: pointer;
  text-align: center;
  ${down("xs")} {
    margin-top: ${({ theme: { gutterSpace } }) => `${gutterSpace * 10}px`};
  }
`;

interface RulesModalProps {
  isMobile: boolean | null;
  close: () => void;
}

const RulesModal: FC<RulesModalProps> = ({ isMobile, close }) => {
  return (
    <Container>
      <HeadingContainer>
        <Heading>Rules</Heading>
        {!isMobile && (
          <CloseButton onClick={close}>
            <img src={CloseIcon} alt="Close" />
          </CloseButton>
        )}
      </HeadingContainer>
      <img src={TriangleRules} alt="Missing rules" />
      {isMobile && (
        <CloseButton onClick={close}>
          <img src={CloseIcon} alt="Close" />
        </CloseButton>
      )}
    </Container>
  );
};

export { RulesModal };
