import styled from "styled-components";

export const CardGrid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.25rem;

  @media (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    align-items: center;
    align-content: center;
    justify-items: center;
  }
`;
