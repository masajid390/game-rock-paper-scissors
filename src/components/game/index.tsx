import {
  FC,
  memo,
  useCallback,
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
import { BGTriangle, PaperIcon, RockIcon, ScissorIcon } from "../lib/icons";
import { SelectionControl } from "../../interfaces/game";
import { useBreakpoint } from "styled-breakpoints/react-styled";
import { down } from "styled-breakpoints";
import { ComputerTurn } from "./ComputerTurn";
import { Modal } from "../lib/Modal";
import { RulesModal } from "./RulesModal";
import { useLocalStorage } from "../../hooks/app";

const Container = styled("div")<{ isMobile: boolean | null }>`
${({ theme, isMobile }) => `
    padding: ${theme.gutterSpace * (isMobile ? 3 : 6)}px;
    height: calc(100% - ${theme.gutterSpace * (isMobile ? 3 : 6) * 2}px);
    overflow: hidden;
  `}}
`;

const UserTurnContainer = styled("div")<{ isMobile: boolean | null }>`
${({ isMobile }) => `
    margin-top: ${isMobile ? "45%" : "40%"};
  `}}
`;

const ComputerTurnContainer = styled("div")<{ isMobile: boolean | null }>`
${({ isMobile }) => `
    margin-top: ${isMobile ? "10%" : "28%"};
  `}}
`;

const GameContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
  height: calc(100% - 32px);
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  z-index: 2;
`;

type Step = "UserTurn" | "WaitingForComputerTurn" | "ComputerTurned" | "Result";
type GameAction =
  | "UserCompletedTurn"
  | "ComputerCompletedTurn"
  | "Result"
  | "PlayAgain"
  | "SetScoreFromLocalStorage";

interface PlayAreaProps {
  controls: SelectionControl[];
  step: Step;
  userSelected?: SelectionControl;
  computerSelected?: SelectionControl;
  win?: boolean;
  isMobile: boolean | null;
  userTurn: (userSelectedId: string) => void;
  computerTurn: () => void;
  playAgain: () => void;
}
const PlayArea: FC<PlayAreaProps> = ({
  controls,
  step,
  userSelected,
  computerSelected,
  win,
  isMobile,
  userTurn,
  computerTurn,
  playAgain,
}) => {
  if (step === "UserTurn") {
    return (
      <UserTurnContainer isMobile={isMobile}>
        <UserTurn
          controls={controls}
          backgroundSrc={BGTriangle}
          userTurn={userTurn}
        />
      </UserTurnContainer>
    );
  }

  if (step === "WaitingForComputerTurn" && userSelected) {
    return (
      <ComputerTurnContainer isMobile={isMobile}>
        <ComputerTurn
          timeToThink={1000}
          userSelected={userSelected}
          computerTurn={computerTurn}
        />
      </ComputerTurnContainer>
    );
  }

  if (step === "ComputerTurned" && userSelected) {
    return (
      <ComputerTurnContainer isMobile={isMobile}>
        <ComputerTurn
          timeToThink={0}
          userSelected={userSelected}
          computerSelected={computerSelected}
          computerTurn={computerTurn}
        />
      </ComputerTurnContainer>
    );
  }

  if (step === "Result" && userSelected) {
    return (
      <ComputerTurnContainer isMobile={isMobile}>
        <ComputerTurn
          userSelected={userSelected}
          computerSelected={computerSelected}
          win={win}
          playAgain={playAgain}
        />
      </ComputerTurnContainer>
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
const Game: FC = memo(() => {
  const [state, dispatch] = useReducer(appReducer, {
    score: 0,
    currentStep: "UserTurn",
  });
  const [showRules, setShowRules] = useState<boolean>(false);
  const isMobile = useBreakpoint(down("xs"));
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const size = isMobile ? 100 : 135;
  const top = isMobile ? 60 : 80;
  const left = isMobile ? 8 : 80;
  const right = isMobile ? 8 : 70;
  const bottom = isMobile ? 8 : 30;
  const border = isMobile ? 15 : 20;
  const controls: SelectionControl[] = useMemo(
    () => [
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
    [size, top, left, right, bottom, border]
  );

  const userSelected = controls.find(({ id }) => state.userSelectedId === id);
  const computerSelected = controls.find(
    ({ id }) => state.computerSelectedId === id
  );
  const step = state.currentStep;
  const score = state.score;

  useEffect(() => {
    const existingScore = getLocalStorage(SCORE_KEY);
    if (existingScore !== null) {
      dispatch({ type: "SetScoreFromLocalStorage", payload: existingScore });
    }
  }, [getLocalStorage, dispatch]);

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
      setLocalStorage(SCORE_KEY, newScore);
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
  ]);

  const playAgain = useCallback(() => dispatch({ type: "PlayAgain" }), [
    dispatch,
  ]);

  return (
    <Container isMobile={isMobile}>
      <GameContent>
        <HeaderContainer>
          <Header score={state.score} />
        </HeaderContainer>
        <PlayArea
          controls={controls}
          step={state.currentStep}
          userSelected={userSelected}
          computerSelected={computerSelected}
          win={state.win}
          isMobile={isMobile}
          userTurn={userTurn}
          computerTurn={computerTurn}
          playAgain={playAgain}
        />
      </GameContent>
      <ActionBar>
        <Button onClick={() => setShowRules(true)}>Rules</Button>
      </ActionBar>
      {showRules && (
        <Modal>
          <RulesModal isMobile={isMobile} close={closeRules} />
        </Modal>
      )}
    </Container>
  );
});

export { Game };
