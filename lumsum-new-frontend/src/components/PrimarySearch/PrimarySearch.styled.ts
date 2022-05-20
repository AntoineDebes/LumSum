import styled from "styled-components";
import { Input } from "antd";

export const primarySearch = styled.div`
  position: relative;
`;

export const primarySearchInput = styled(Input)`
  padding: 0.875rem 1.5rem 0.875rem 4rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 2rem;
  box-shadow: 0 3px 6px ${({ theme }) => theme.colors.boxShadowColor};

  @media (max-width: 767px) {
    padding: 0.5rem 1.25rem 0.5rem 3.5rem;
  }
`;

export const searchboxWrap = styled.div`
  width: 100%;
  position: relative;

  @media (max-width: 1023px) {
    margin-top: 0.75rem;
  }
`;

export const searchboxLabel = styled.label`
  position: absolute;
  top: 1rem;
  left: 1.5rem;
  z-index: 1;

  @media (max-width: 767px) {
    top: 0.875rem;
  }
`;

export const IconWrap = styled.div`
  position: relative;
  width: 1.25rem;
  height: 1.25rem;

  @media (max-width: 767px) {
    width: 1rem;
    height: 1rem;
  }
`;

export const resultsPanel = styled.div`
  background: #fff;
  width: 44.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 6px ${({ theme }) => theme.colors.boxShadowColor};
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: absolute;
  top: calc(3.5rem + 0.625rem);
  left: 0.75rem;
  z-index: 1;

  &::before {
    content: "";
    width: 0;
    height: 0;
    border-left: 0.625rem solid transparent;
    border-right: 0.625rem solid transparent;
    border-bottom: 0.625rem solid #fff;
    filter: drop-shadow(
      0 -2px 2px ${({ theme }) => theme.colors.boxShadowColor}
    );
    display: block;
    position: absolute;
    top: calc(-0.625rem + 1px);
    left: 0.75rem;
  }

  @media (max-width: 1120px) {
    width: 100%;
  }
`;

export const resultsSubPanel = styled.div`
  padding: 1rem;
`;

export const resultsList = styled.ul`
  margin-bottom: 0;
`;

export const resultsListLi = styled.li`
  margin: 0.25em 0;
`;

export const resultHighlight = styled.strong`
  color: ${({ theme }) => theme.colors.primary};
`;
