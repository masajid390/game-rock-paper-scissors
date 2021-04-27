import { memo } from "react";
import styled from "styled-components";
import { RoundButton, RoundButtonProps } from "../lib/Button";
import { Column, Row } from "../lib/Grid";
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
        font-size: 24px;
    `}
`;

const Header = styled.div`
  color: ${({ theme: { colors } }) => `${colors.main};`};
  padding: ${({ theme: { gutterSpace } }) => `${gutterSpace * 6}px;`};
  text-align: center;
  font-size: 32px;
  max-width: 500px;
  margin: 0 auto;
  position: fixed;
  right: 0;
  left: 0;
`;

const HeaderText = styled.div`
  padding: ${({ theme: { gutterSpace } }) => `${gutterSpace * 2}px;`};
`;

interface LevelControl extends RoundButtonProps {
  text: string;
}

const GameModes = memo(() => {
  const size: number = 150;
  const border: number = 20;
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
      gradientFromColor: "hsl(39, 89%, 49%)",
      gradientToColor: "hsl(40, 84%, 53%)",
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
        </BaseHeader>
      </Header>
      <Column justifyContent="center">
        <Levels>
          {controls.map((control, key) => (
            <ControlContainer key={key}>
              <RoundButton {...control} to={control.text}>
                {control.text}
              </RoundButton>
            </ControlContainer>
          ))}
        </Levels>
      </Column>
    </Container>
  );
});

export { GameModes };
