import styled from "styled-components";

export const RatingCard = styled.div`
  background: #ffffff;
  max-width: 26rem;
  padding: 1.125rem 1.25rem;
  border-radius: 0.75rem;
  box-shadow: 0 5px 6px ${({ theme }) => theme.colors.boxShadowColor};
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 1.5rem;
  }
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSize.h4};
  font-weight: 700;
`;

export const Question = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1em;
`;

// export const ButtonWrap = styled(C.ButtonWrap)`
//   justify-content: center;
//   margin-top: 1rem;
// `;

// export const Buttons = styled(Button)`
//   color: ${({ theme }) => theme.colors.primary};
//   font-size: 1rem;
// `;
