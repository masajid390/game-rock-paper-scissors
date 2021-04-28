import { FC, memo, useContext } from "react";
import styled from "styled-components";
import { down } from "styled-breakpoints";
import { Row } from "../lib/Grid";
import { GameContext } from "../../context/game";

const BaseHeaderContainer = styled.div`
  border: 2px solid hsl(217, 16%, 45%);
  border-radius: ${({ theme }) => `${theme.borderRadius}`};
`;

const Container = styled.div`
  padding: ${({ theme }) =>
    `${theme.gutterSpace * 2}px ${theme.gutterSpace * 2}px ${
      theme.gutterSpace * 2
    }px ${theme.gutterSpace * 4}px`};
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleWord = styled.h1`
  margin: 0;
  color: ${({ theme }) => `${theme.colors.main}`};
  line-height: 0.8;
  ${down("xs")} {
    font-size: 22px;
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => `${theme.colors.main}`};
  border-radius: ${({ theme }) => `${theme.borderRadius}`};
  padding: ${({ theme }) =>
    `${theme.gutterSpace}px ${theme.gutterSpace * 4}px`};
  ${down("xs")} {
    padding: ${({ theme }) =>
      `${theme.gutterSpace}px ${theme.gutterSpace * 2}px`};
  }
`;

const ScoreTitle = styled.div`
  color: hsl(229, 64%, 46%);
  letter-spacing: 2px;
  text-align: center;
  font-size: 13px;
  ${down("xs")} {
    font-size: 11px;
  }
`;

const ScoreText = styled.div`
  color: ${({ theme }) => `${theme.colors.secondary}`};
  font-weight: bold;
  line-height: 1;
  text-align: center;
  font-size: 52px;
  ${down("xs")} {
    font-size: 42px;
  }
`;

const BaseHeader: FC = ({ children }) => {
  return <BaseHeaderContainer>{children}</BaseHeaderContainer>;
};

interface HeaderProps {
  score: number;
}
const Header: FC<HeaderProps> = memo(({ score }) => {
  const { gameMode } = useContext(GameContext);
  let title: string[] = ["Rock", "Paper", "Scissors"];
  if (gameMode === "Advance") {
    title = [...title, "Lizard", "Spock"];
  }
  return (
    <BaseHeader>
      <Container>
        <Row justifyContent="space-between" alignItems="center">
          <Title>
            {title.map((text, key) => (
              <TitleWord key={key}>{text}</TitleWord>
            ))}
          </Title>
          <ScoreContainer>
            <ScoreTitle>Score</ScoreTitle>
            <ScoreText>{score}</ScoreText>
          </ScoreContainer>
        </Row>
      </Container>
    </BaseHeader>
  );
});

export { BaseHeader, Header };
