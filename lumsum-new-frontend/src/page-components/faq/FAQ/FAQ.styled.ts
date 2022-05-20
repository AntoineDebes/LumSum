import styled from "styled-components";

export const ContainerInnerWrap = styled.div`
  width: 100%;
  max-width: 83rem;
  margin: 0 auto;
`;

export const HomeSection = styled.section`
  padding: 3rem 0;
  overflow: hidden;
`;

export const HomeSectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 2.5rem;
  margin-bottom: 1em;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Question = styled.h3`
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 0.5em;
  margin-top: 1em;
  font-size: 1.5rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
export const Answer = styled.p`
  color: ${({ theme }) => theme.colors.primaryGreyish};
  margin-bottom: 0.5em;
  font-size: 1rem;
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const List = styled.ul`
  display: block;
  margin-left: 15px;
  font-weight: 400;
  width: 100%;
`;
export const ListItem = styled.li`
  color: ${({ theme }) => theme.colors.primaryGreyish};
  font-size: 1rem;
  margin-left: 20px;
  list-style-type: circle !important;
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;
