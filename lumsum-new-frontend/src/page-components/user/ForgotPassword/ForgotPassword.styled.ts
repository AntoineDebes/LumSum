import styled from "styled-components";

export const Disclaimer = styled.div`
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 1rem;
`;

export const DisclaimerText = styled.p`
  text-align: center;
  font-size: 0.625rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
