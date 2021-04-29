import { memo, useContext } from "react";
import { down } from "styled-breakpoints";
import styled from "styled-components";
import { AppContext } from "../../context/app";
import { RoundButton, RoundButtonProps } from "../lib/Button";
import { Column, Row } from "../lib/Grid";
import { StyledLink } from "../lib/StyledLink";
import { BaseHeader } from "./Header";

const Container = styled.div`
  height: 100%;
`;

const Levels = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ControlContainer = styled.div`
  ${({ theme: { gutterSpace } }) => `
        margin: 0 ${gutterSpace * 5}px;
        font-size: 28px;
    `}
  ${down("xs")} {
    font-size: 22px;
  }
`;

const Header = styled.h1`
  ${({ theme: { colors, gutterSpace }, ...rest }) => `
   color: ${colors.main};
    text-align: center;
    max-width: 500px;
    margin: 0 auto;
    position: fixed;
    right: 0;
    left: 0;
    padding: ${gutterSpace * 6}px;
  `}
  ${down("xs")} {
    padding: ${({ theme: { gutterSpace } }) => `${gutterSpace * 3}px`};
    font-size: 22px;
  }
`;

const HeaderText = styled.div`
  padding: ${({ theme: { gutterSpace } }) => `${gutterSpace * 2}px;`};
`;

const YouVsComputer = styled.h1`
  margin: 0;
  font-size: 32px;
  margin-bottom: 16px;
  color: hsl(40, 84%, 53%);
  ${down("xs")} {
    font-size: 22px;
  }
`;

interface LevelControl extends RoundButtonProps {
  text: string;
}

const GameModes = memo(() => {
  const { isMobile } = useContext(AppContext);
  const size: number = isMobile ? 100 : 150;
  const border: number = isMobile ? 15 : 20;
  const controls: LevelControl[] = [
    {
      text: "Basic",
      gradientFromColor: "hsl(230, 89%, 62%)",
      gradientToColor: "hsl(230, 89%, 65%)",
      size,
      border,
    },
    {
      text: "Advance",
      gradientFromColor: "hsl(349, 71%, 52%)",
      gradientToColor: "hsl(349, 70%, 56%)",
      size,
      border,
    },
  ];
  return (
    <Container>
      <Header>
        <BaseHeader>
          <Row justifyContent="center">
            {["Rock", "Paper", "Scissors"].map((text, key) => (
              <HeaderText key={key}>{text}</HeaderText>
            ))}
          </Row>
          <YouVsComputer>You vs Computer</YouVsComputer>
        </BaseHeader>
      </Header>
      <Column justifyContent="center">
        <Levels>
          {controls.map((control, key) => (
            <ControlContainer key={key}>
              <StyledLink to={`/${control.text}`}>
                <RoundButton {...control}>{control.text}</RoundButton>
              </StyledLink>
            </ControlContainer>
          ))}
        </Levels>
      </Column>
    </Container>
  );
});

export { GameModes };
