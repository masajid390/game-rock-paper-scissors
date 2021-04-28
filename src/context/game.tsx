import React, { FC, useMemo } from "react";
import { GameMode } from "../interfaces/game";

interface GameContextProps {
  gameMode: GameMode;
}
const GameContext = React.createContext<GameContextProps>({
  gameMode: "Basic",
});

const GameProvider: FC<GameContextProps> = ({ children, gameMode }) => {
  const value = useMemo(() => ({ gameMode }), [gameMode]);
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { GameContext, GameProvider };
