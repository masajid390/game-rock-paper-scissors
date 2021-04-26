import styled from "styled-components";
import { RoundButton } from "../lib/Button";
import { FC, memo } from "react";
import { SelectionControl, IPosition } from "../../interfaces/game";
import { down } from "styled-breakpoints";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Content = styled.div`
  position: relative;
  justify-content: center;
  display: flex;
`;

const Background = styled.img`
  ${down("xs")} {
    max-width: 80%;
  }
`;

const IconButtonContainer = styled("div")<IPosition>`
  ${({ top, right, bottom, left }) => `
  position: absolute;
  top: ${top}px;
  right: ${right}px;
  bottom: ${bottom}px;
  left: ${left}px;
  `}
`;

interface UserTurnProps {
  controls: SelectionControl[];
  backgroundSrc: string;
  userTurn: (userSelectedId: string) => void;
}

const UserTurn: FC<UserTurnProps> = memo(
  ({ controls, backgroundSrc, userTurn }) => {
    return (
      <Container>
        <Content>
          <Background src={backgroundSrc} />
          {controls.map((control) => {
            const {
              id,
              iconSrc,
              gradientFromColor,
              gradientToColor,
              size,
              border,
              position: { top, right, bottom, left },
            } = control;
            return (
              <IconButtonContainer
                key={id}
                top={top}
                right={right}
                bottom={bottom}
                left={left}
                onClick={() => userTurn(control.id)}
              >
                <RoundButton
                  gradientFromColor={gradientFromColor}
                  gradientToColor={gradientToColor}
                  size={size}
                  border={border}
                >
                  <img src={iconSrc} alt="Icon Button" />
                </RoundButton>
              </IconButtonContainer>
            );
          })}
        </Content>
      </Container>
    );
  }
);

export { UserTurn };
