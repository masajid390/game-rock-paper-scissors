import styled from "styled-components";
import { down } from "styled-breakpoints";

const ActionBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  ${down("xs")} {
    justify-content: center;
  }
`;

export { ActionBar };
