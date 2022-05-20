import styled from "styled-components";

export const Aside = styled.aside`
  width: 16rem;
  padding: 3rem 1rem 0 0;
  position: fixed;

  @media (max-width: 1279px) {
    width: 13rem;
  }

  @media (max-width: 1023px) {
    position: static;
    width: 100%;
    padding: 1.75rem 0 0;
  }
`;
