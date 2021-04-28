import { FC } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { GameContainer } from "./components/game";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GameModes } from "./components/game/GameModes";
import { useBreakpoint } from "styled-breakpoints/react-styled";
import { down } from "styled-breakpoints";
import { AppProvider } from "./context/app";

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
  const isMobile = useBreakpoint(down("xs"));
  return (
    <ThemeProvider theme={theme}>
      <AppProvider isMobile={isMobile}>
        <AppContainer>
          <Router>
            <Switch>
              <Route path={["/Basic", "/Advance"]} component={GameContainer} />
              <Route path="/" component={GameModes} />
            </Switch>
          </Router>
        </AppContainer>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
