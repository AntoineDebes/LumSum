import styled from "styled-components";

interface BoxProps {
  maxwidth?: string;
}

export const Box = styled.div<BoxProps>`
  background: #ffffff;
  width: 100%;
  max-width: ${(props) => (props.maxwidth ? props.maxwidth : "100%")};
  border-radius: 1rem;
  box-shadow: 0 5px 6px ${({ theme }) => theme.colors.boxShadowColor};
  overflow: hidden;
  margin-bottom: 2rem;
`;

export const BoxHeader = styled.div`
  color: ${({ theme }) => theme.colors.primaryDark};
  background: ${({ theme }) => theme.colors.primaryLight1};
  padding: 1rem 2rem;
`;

export const BoxBody = styled.div`
  padding: 1.5rem 2rem;

  @media (max-width: 810px) {
    padding: 1.25rem;
  }
`;
