import { Button } from "@mui/material";
import styled from "styled-components";

export const FlexDivRow = styled.div`
  display: flex;
  justify-content: center;
`;

export const FlexDivColumn= styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top:8px;
`;

export const RoundButton = styled(Button)`
border-radius: 24px;
`