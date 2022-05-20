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
  margin-bottom: 1.5em;
  font-size: 2.5rem;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const WhyCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(21rem, 21rem));
  justify-content: space-between;
  /* grid-gap: 15rem; */

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(20rem, 21rem));
    grid-gap: 2.5rem;
  }
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export const WhyCards = styled.div`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  background: #ffffff;
  padding: 2rem;
  padding-top: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 5px 6px ${({ theme }) => theme.colors.boxShadowColor};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1120px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  @media (max-width: 540px) {
    max-width: 25rem;
    margin: auto;
  }
`;
export const WhyCardsImageWrap = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
  margin-bottom: 1rem;
`;

export const WhyCardsTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.h4};
  font-weight: 700;
`;

export const WhyCardsText = styled.p`
  margin-bottom: 0;
  margin-top: 0.5em;
  font-size: 1.1rem;
`;