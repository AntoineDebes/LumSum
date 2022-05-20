import styled from "styled-components";
import Button from "@/components/Button/Button";
import Filters from "@/components/Filters/Filters";
import ContainerMainFixedAside from "@/components/ContainerMainFixedAside/ContainerMainFixedAside";

interface HomeFiltersProps {
  visible?: boolean;
}

export const SuppliersContainer = styled(ContainerMainFixedAside)`
  min-height: 100vh;

  @media (max-width: 1279px) {
    margin-left: 15rem;
  }

  @media (max-width: 1023px) {
    margin-left: 0;
  }
`;

export const HomeFilters = styled(Filters)<HomeFiltersProps>`
  @media (max-width: 1279px) {
    width: 15rem;
  }

  @media (max-width: 1023.98px) {
    background: #fff;
    width: 100%;
    height: 100%;
    padding: 1.25rem 1rem;
    position: absolute;
    left: 0;
    z-index: 5;
    transform: scale(0);
    transform-origin: top left;
    transition: transform, 0.2s ease-in;

    @media (max-width: 1023.98px) {
      position: fixed;
      z-index: 6;
    }

    ${(props) =>
      props.visible &&
      `
         {
          transform: scale(1);
        }
      `}
  }
`;

export const BoldThemeText = styled.strong`
  color: ${({ theme }) => theme.colors.primary};
`;

export const cardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: self-start;
  justify-items: center;
  width: fit-content;
  margin: auto;
  grid-gap: 2.75rem;

  @media (max-width: 1024px) {
    grid-gap: 1.75rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const LoadMoreWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem auto 0;
`;
