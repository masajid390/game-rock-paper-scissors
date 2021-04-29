import {
  FC,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import styled from "styled-components";
import { Button } from "../lib/Button";
import { ActionBar } from "../lib/ActionBar";
import { Header } from "./Header";
import { UserTurn } from "./UserTurn";
import {
  BGTriangle,
  PaperIcon,
  RockIcon,
  ScissorIcon,
  SpockIcon,
  LizardIcon,
  BGPentagon,
} from "../lib/icons";
import { GameUI, SelectionControl, GameMode } from "../../interfaces/game";
import { ComputerTurn } from "./ComputerTurn";
import { Modal } from "../lib/Modal";
import { RulesModal } from "./RulesModal";
import { useLocalStorage } from "../../hooks/app";
import BasicRules from "../../assets/game/rules/basic.svg";
import AdvanceRules from "../../assets/game/rules/advance.svg";
import { useLocation } from "react-router-dom";
import { StyledLink } from "../lib/StyledLink";
import { AppContext } from "../../context/app";
import { GameContext, GameProvider } from "../../context/game";
import { down } from "styled-breakpoints";

const Container = styled.div`
  height: 100%;
  overflow: hidden;
`;

const GameContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  max-width: 700px;
  margin: 0 auto;
`;

const HeaderContainer = styled.div`
  ${({ theme: { gutterSpace } }) => `
    position: fixed;
    top: ${gutterSpace * 6}px;
    left: ${gutterSpace * 6}px;
    right: ${gutterSpace * 6}px;
    z-index: 2;
    max-width: 700px;
    margin: 0 auto;
  `}
  ${down("xs")} {
    top: ${({ theme: { gutterSpace } }) => `${gutterSpace * 3}px;`};
    left: ${({ theme: { gutterSpace } }) => `${gutterSpace * 3}px;`};
    right: ${({ theme: { gutterSpace } }) => `${gutterSpace * 3}px;`};
  }
`;

const FooterContainer = styled.div`
  ${({ theme: { gutterSpace } }) => `
    position: fixed;
    left: ${gutterSpace * 6}px;
    right: ${gutterSpace * 6}px;
    bottom: ${gutterSpace * 6}px;
    z-index: 2;
  `}
  ${down("xs")} {
    left: ${({ theme: { gutterSpace } }) => `${gutterSpace * 3}px;`};
    right: ${({ theme: { gutterSpace } }) => `${gutterSpace * 3}px;`};
    bottom: ${({ theme: { gutterSpace } }) => `${gutterSpace * 3}px;`};
  }
`;

type Step = "UserTurn" | "WaitingForComputerTurn" | "ComputerTurned" | "Result";
type GameAction =
  | "UserCompletedTurn"
  | "ComputerCompletedTurn"
  | "Result"
  | "PlayAgain"
  | "SetScoreFromLocalStorage";

const useBasicGameUI = (isMobile: boolean | null): GameUI => {
  const size = isMobile ? 100 : 135;
  const top = isMobile ? 60 : 80;
  const left = isMobile ? 8 : 80;
  const right = isMobile ? 8 : 70;
  const bottom = isMobile ? 8 : 30;
  const border = isMobile ? 15 : 20;
  return useMemo(
    () => ({
      controls: [
        {
          id: "paper",
          iconSrc: PaperIcon,
          gradientFromColor: "hsl(230, 89%, 62%)",
          gradientToColor: "hsl(230, 89%, 65%)",
          size,
          border,
          position: { top: -top, left: -left },
          canBeat: ["rock"],
        },
        {
          id: "scissor",
          iconSrc: ScissorIcon,
          gradientFromColor: "hsl(39, 89%, 49%)",
          gradientToColor: "hsl(40, 84%, 53%)",
          size,
          border,
          position: { top: -top, right: -right },
          canBeat: ["paper"],
        },
        {
          id: "rock",
          iconSrc: RockIcon,
          gradientFromColor: "hsl(349, 71%, 52%)",
          gradientToColor: "hsl(349, 70%, 56%)",
          size,
          border,
          position: { bottom: -bottom },
          canBeat: ["scissor"],
        },
      ],
      backgroundSrc: BGTriangle,
    }),
    [size, top, left, right, bottom, border]
  );
};

const useAdvanceGameUI = (isMobile: boolean | null): GameUI => {
  const size = isMobile ? 80 : 100;
  const border = isMobile ? 15 : 20;
  return useMemo(
    () => ({
      controls: [
        {
          id: "scissor",
          iconSrc: ScissorIcon,
          gradientFromColor: "hsl(39, 89%, 49%)",
          gradientToColor: "hsl(40, 84%, 53%)",
          size,
          border,
          position: { top: isMobile ? -50 : -60, right: isMobile ? 105 : 90 },
          canBeat: ["paper", "lizard"],
        },
        {
          id: "spock",
          iconSrc: SpockIcon,
          gradientFromColor: "hsl(189, 59%, 53%)",
          gradientToColor: "hsl(189, 58%, 57%)",
          size,
          border,
          position: { top: isMobile ? 40 : 55, left: isMobile ? -10 : -45 },
          canBeat: ["scissor", "rock"],
        },
        {
          id: "paper",
          iconSrc: PaperIcon,
          gradientFromColor: "hsl(230, 89%, 62%)",
          gradientToColor: "hsl(230, 89%, 65%)",
          size,
          border,
          position: { top: isMobile ? 40 : 55, right: isMobile ? -10 : -45 },
          canBeat: ["rock", "spock"],
        },
        {
          id: "lizard",
          iconSrc: LizardIcon,
          gradientFromColor: "hsl(261, 73%, 60%)",
          gradientToColor: "hsl(261, 72%, 63%)",
          size,
          border,
          position: { bottom: isMobile ? -40 : -45, left: isMobile ? 30 : 0 },
          canBeat: ["spock", "paper"],
        },
        {
          id: "rock",
          iconSrc: RockIcon,
          gradientFromColor: "hsl(349, 71%, 52%)",
          gradientToColor: "hsl(349, 70%, 56%)",
          size,
          border,
          position: { bottom: isMobile ? -40 : -45, right: isMobile ? 30 : 0 },
          canBeat: ["lizard", "scissor"],
        },
      ],
      backgroundSrc: BGPentagon,
    }),
    [size, border, isMobile]
  );
};

interface PlayAreaProps {
  gameUI: GameUI;
  step: Step;
  userSelected?: SelectionControl;
  computerSelected?: SelectionControl;
  win?: boolean;
  userTurn: (userSelectedId: string) => void;
  computerTurn: () => void;
  playAgain: () => void;
}
const PlayArea: FC<PlayAreaProps> = ({
  gameUI,
  step,
  userSelected,
  computerSelected,
  win,
  userTurn,
  computerTurn,
  playAgain,
}) => {
  const { controls, backgroundSrc } = gameUI;
  if (step === "UserTurn") {
    return (
      <UserTurn
        controls={controls}
        backgroundSrc={backgroundSrc}
        userTurn={userTurn}
      />
    );
  }

  if (step === "WaitingForComputerTurn" && userSelected) {
    return (
      <ComputerTurn
        timeToThink={1000}
        userSelected={userSelected}
        computerTurn={computerTurn}
      />
    );
  }

  if (step === "ComputerTurned" && userSelected) {
    return (
      <ComputerTurn
        timeToThink={0}
        userSelected={userSelected}
        computerSelected={computerSelected}
        computerTurn={computerTurn}
      />
    );
  }

  if (step === "Result" && userSelected) {
    return (
      <ComputerTurn
        userSelected={userSelected}
        computerSelected={computerSelected}
        win={win}
        playAgain={playAgain}
      />
    );
  }

  return <></>;
};

interface GameState {
  score: number;
  currentStep: Step;
  userSelectedId?: string;
  computerSelectedId?: string;
  win?: boolean;
}

interface Action {
  type: GameAction;
  payload?: any;
}

const appReducer = (state: GameState, action: Action): GameState => {
  const { type, payload } = action;
  switch (type) {
    case "UserCompletedTurn": {
      return {
        ...state,
        userSelectedId: payload,
        currentStep: "WaitingForComputerTurn",
      };
    }
    case "ComputerCompletedTurn": {
      return {
        ...state,
        computerSelectedId: payload,
        currentStep: "ComputerTurned",
      };
    }
    case "Result": {
      return {
        ...state,
        currentStep: "Result",
        ...payload,
      };
    }
    case "PlayAgain": {
      return {
        ...state,
        userSelectedId: undefined,
        computerSelectedId: undefined,
        currentStep: "UserTurn",
      };
    }
    case "SetScoreFromLocalStorage": {
      return {
        ...state,
        score: payload,
      };
    }
    default: {
      return state;
    }
  }
};
const SCORE_KEY = "__ROCK_PAPER_SCISSORS_SCORE__";

const getScoreKey = (gameMode: GameMode) =>
  `${SCORE_KEY}${gameMode.toLocaleUpperCase()}__`;

const Game = memo(() => {
  const [state, dispatch] = useReducer(appReducer, {
    score: 0,
    currentStep: "UserTurn",
  });
  const [showRules, setShowRules] = useState<boolean>(false);
  const { isMobile } = useContext(AppContext);
  const { gameMode } = useContext(GameContext);
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const basicGameUI: GameUI = useBasicGameUI(isMobile);
  const advanceGameUI: GameUI = useAdvanceGameUI(isMobile);
  const gameUI: GameUI = gameMode === "Advance" ? advanceGameUI : basicGameUI;
  const { controls } = gameUI;
  const userSelected = controls.find(({ id }) => state.userSelectedId === id);
  const computerSelected = controls.find(
    ({ id }) => state.computerSelectedId === id
  );
  const step = state.currentStep;
  const score = state.score;
  const scoreKey = getScoreKey(gameMode);

  useEffect(() => {
    const existingScore = getLocalStorage(scoreKey);
    if (existingScore !== null) {
      dispatch({ type: "SetScoreFromLocalStorage", payload: existingScore });
    }
  }, [getLocalStorage, dispatch, scoreKey]);

  const closeRules = useCallback(() => setShowRules(false), []);

  const userTurn = useCallback(
    (userSelectedId: string) =>
      dispatch({ type: "UserCompletedTurn", payload: userSelectedId }),
    [dispatch]
  );

  const computerTurn = useCallback(() => {
    if (step === "WaitingForComputerTurn") {
      const availableControls = controls.filter(
        ({ id }) => userSelected?.id !== id
      );
      const randomIndex = Math.floor(Math.random() * availableControls.length);
      dispatch({
        type: "ComputerCompletedTurn",
        payload: availableControls[randomIndex].id,
      });
    } else if (step === "ComputerTurned" && computerSelected) {
      const win = userSelected?.canBeat.includes(computerSelected.id); // constructing win state
      const newScore = win ? score + 1 : score - 1;
      setLocalStorage(scoreKey, newScore);
      dispatch({
        type: "Result",
        payload: { win, score: newScore },
      });
    }
  }, [
    dispatch,
    controls,
    userSelected,
    computerSelected,
    step,
    score,
    setLocalStorage,
    scoreKey,
  ]);

  const playAgain = useCallback(() => dispatch({ type: "PlayAgain" }), [
    dispatch,
  ]);

  return (
    <Container>
      <HeaderContainer>
        <Header score={state.score} />
      </HeaderContainer>
      <GameContent>
        <PlayArea
          gameUI={gameUI}
          step={state.currentStep}
          userSelected={userSelected}
          computerSelected={computerSelected}
          win={state.win}
          userTurn={userTurn}
          computerTurn={computerTurn}
          playAgain={playAgain}
        />
      </GameContent>
      <FooterContainer>
        <ActionBar>
          <StyledLink to="/">
            <Button>Modes</Button>
          </StyledLink>
          <Button onClick={() => setShowRules(true)}>Rules</Button>
        </ActionBar>
      </FooterContainer>
      {showRules && (
        <Modal>
          <RulesModal
            close={closeRules}
            imageSrc={gameMode === "Basic" ? BasicRules : AdvanceRules}
          />
        </Modal>
      )}
    </Container>
  );
});

const GameContainer = memo(() => {
  const { pathname } = useLocation();
  const gameMode: GameMode = pathname === "/Advance" ? "Advance" : "Basic";
  return (
    <GameProvider gameMode={gameMode}>
      <Game />
    </GameProvider>
  );
});

export { Game, GameContainer };
