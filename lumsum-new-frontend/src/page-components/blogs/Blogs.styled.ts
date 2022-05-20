import styled from "styled-components";

export const BlogList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;

  @media (max-width: 940px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

export const BlogListLi = styled.li`
  @media (max-width: 540px) {
    justify-self: center;
    max-width: 20rem;
  }
`;
