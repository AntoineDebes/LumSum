import styled from "styled-components";

export const CardInputWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  max-width: 22.75rem;
  margin-top: 1rem;

  & > div:not(:last-child) {
    max-width: unset;
    margin-bottom: 0;
  }
`;
