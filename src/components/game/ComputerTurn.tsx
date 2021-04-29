import { FC, useEffect, memo, useContext } from "react";
import styled from "styled-components";
import { SelectionControl } from "../../interfaces/game";
import { Button, RoundButton } from "../lib/Button";
import { WaveBox } from "../lib/WaveBox";
import { AppContext } from "../../context/app";
import { GameContext } from "../../context/game";

const Container = styled("div")<{ zIndex?: number }>`
  ${({ zIndex = 1 }) => `
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    z-index: ${zIndex};
  `}
`;

const Row = styled.div`
  ${({ theme: { gutterSpace } }) => `
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin: ${gutterSpace * 3}px 0;
    position: relative;
  `}
`;

const Column = styled("div")<{ zIndex?: number }>`
  ${({ zIndex = 1 }) => `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    z-index: ${zIndex};
  `}
`;

const EmptyControl = styled("div")<{ size: number; marginBottom: number }>`
  ${({ size, marginBottom }) => `
      height: ${size}px;
      width: ${size}px;
      border-radius: 50%;
      background: #3B4262;
      margin: 20px;
      margin-bottom: ${marginBottom}px;
    `}
`;

const Text = styled("div")<{ fontSize: number; margin?: string }>`
  ${({ fontSize, margin = "32px 0", theme: { colors } }) => `
      font-size: ${fontSize}px;
      color: ${colors.main};
      margin: ${margin};
    `}
`;

const Order = styled("div")<{ order: number }>`
  ${({ order }) => `
    order: ${order};
  `}
`;

const CelebrationContainer = styled("div")<{ top: string }>`
  ${({ top }) => `
    position: absolute;
    top: ${top};
  `}
`;

const Celebration: FC<{ isMobile: boolean | null }> = ({ isMobile }) => {
  const { gameMode } = useContext(GameContext);
  return (
    <CelebrationContainer
      top={
        gameMode === "Basic"
          ? isMobile
            ? "-41%"
            : "-13%"
          : isMobile
          ? "-50%"
          : "-24%"
      }
    >
      <WaveBox
        gradients={Array(3).fill({
          start: "hsl(214deg 50% 34%)",
          end: "hsl(214deg 63% 22%)",
        })}
        stepHeight={isMobile ? 60 : 80}
        radius={isMobile ? 120 : 180}
      />
    </CelebrationContainer>
  );
};

interface WinLossProps {
  playAgain?: () => void;
}

const YouWin: FC<WinLossProps> = ({ playAgain }) => (
  <>
    <Text fontSize={42} margin={"16px 0"}>
      You Win
    </Text>
    <Button onClick={playAgain} color="secondary" background="main">
      Play Again
    </Button>
  </>
);

const YouLoss: FC<WinLossProps> = ({ playAgain }) => (
  <>
    <Text fontSize={42} margin={"16px 0"}>
      You Loss
    </Text>
    <Button onClick={playAgain} color="hsl(349, 71%, 52%)" background="main">
      Play Again
    </Button>
  </>
);

interface ComputerTurnProps {
  timeToThink?: number;
  userSelected: SelectionControl;
  computerSelected?: SelectionControl;
  win?: boolean;
  computerTurn?: () => void;
  playAgain?: () => void;
}

const ComputerTurn: FC<ComputerTurnProps> = memo(
  ({
    timeToThink,
    userSelected,
    computerSelected,
    win,
    computerTurn,
    playAgain,
  }) => {
    const { isMobile } = useContext(AppContext);

    useEffect(() => {
      let timer: NodeJS.Timeout;

      if (timeToThink !== undefined && computerTurn) {
        timer = setTimeout(computerTurn, timeToThink);
      }

      return () => {
        clearTimeout(timer);
      };
    }, [timeToThink, computerTurn]);

    const yourZIndex = win === false ? 2 : 1;

    return (
      <Container>
        <Row>
          <Column zIndex={yourZIndex}>
            <Container>
              <Order order={isMobile ? 2 : 1}>
                <Text fontSize={isMobile ? 16 : 22}>You Picked</Text>
              </Order>
              <Order order={isMobile ? 1 : 2}>
                <RoundButton {...userSelected}>
                  <img src={userSelected.iconSrc} alt="Icon Button" />
                </RoundButton>
              </Order>
            </Container>
            {win && <Celebration isMobile={isMobile} />}
          </Column>
          {!isMobile && win !== undefined && (
            <Column zIndex={3}>
              {win ? (
                <YouWin playAgain={playAgain} />
              ) : (
                <YouLoss playAgain={playAgain} />
              )}
            </Column>
          )}
          <Column zIndex={1}>
            <Container>
              <Order order={isMobile ? 2 : 1}>
                <Text fontSize={isMobile ? 16 : 22}>Computer Picked</Text>
              </Order>
              <Order order={isMobile ? 1 : 2}>
                {computerSelected ? (
                  <RoundButton {...computerSelected}>
                    <img src={computerSelected.iconSrc} alt="Icon Button" />
                  </RoundButton>
                ) : (
                  <EmptyControl
                    size={userSelected.size}
                    marginBottom={isMobile ? 4 : 12}
                  />
                )}
              </Order>
            </Container>
            {win === false && <Celebration isMobile={isMobile} />}
          </Column>
        </Row>
        {isMobile && win !== undefined && (
          <Row>
            <Column>
              {win ? (
                <YouWin playAgain={playAgain} />
              ) : (
                <YouLoss playAgain={playAgain} />
              )}
            </Column>
          </Row>
        )}
      </Container>
    );
  }
);

export { ComputerTurn };
