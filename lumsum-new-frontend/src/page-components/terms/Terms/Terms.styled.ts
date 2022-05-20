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

export const Header = styled.h3`
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 0.5em;
  margin-top: 1.5em;
  font-size: 1.5rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
export const SubHeader = styled.p`
  color: ${({ theme }) => theme.colors.primaryGreyish};
  margin-top: 1.2em;
  font-size: 1.25rem;
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
export const Text = styled.p`
  color: ${({ theme }) => theme.colors.primaryGreyish};
  margin-bottom: 1em;
  font-size: 1rem;
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;