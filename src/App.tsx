import { FC } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { Game } from "./components/game";

const AppContainer = styled.div`
  background-image: radial-gradient(
    circle,
    hsl(214, 47%, 23%),
    hsl(237, 49%, 15%)
  );
  height: 100vh;
  width: 100vw;
`;

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Game gameMode="Advance" />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
