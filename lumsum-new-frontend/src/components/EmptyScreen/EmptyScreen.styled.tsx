import styled from "styled-components";
import Button from "@/components/Button/Button";

export const EmptyScreen = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const EmptyScreenIcon = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
  margin-bottom: 1rem;
`;

export const EmptyScreenTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const EmptyScreenText = styled.p`
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const EmptyScreenButton = styled(Button)``;
