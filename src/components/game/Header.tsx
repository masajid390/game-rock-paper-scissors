import { FC, memo } from "react";
import styled from "styled-components";
import { down } from "styled-breakpoints";

const Container = styled.div`
  border: 2px solid hsl(217, 16%, 45%);
  border-radius: ${({ theme }) => `${theme.borderRadius}`};
  padding: ${({ theme }) =>
    `${theme.gutterSpace * 2}px ${theme.gutterSpace * 2}px ${
      theme.gutterSpace * 2
    }px ${theme.gutterSpace * 4}px`};
  display: flex;
  justify-content: space-between;
  align-items: center;
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

interface HeaderProps {
  score: number;
}
const Header: FC<HeaderProps> = memo(({ score }) => {
  return (
    <Container>
      <Title>
        {["Rock", "Paper", "Scissors"].map((text, key) => (
          <TitleWord key={key}>{text}</TitleWord>
        ))}
      </Title>
      <ScoreContainer>
        <ScoreTitle>Score</ScoreTitle>
        <ScoreText>{score}</ScoreText>
      </ScoreContainer>
    </Container>
  );
});

export { Header };
