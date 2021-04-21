import { FC } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./theme";

const AppContainer = styled.div`
  background-image: radial-gradient(hsl(214, 47%, 23%), hsl(237, 49%, 15%));
  height: 100vh;
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
`;

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer></AppContainer>
    </ThemeProvider>
  );
};

export default App;
