import styled from "styled-components";

export const NavCart = styled.nav`
  margin-left: 2.25rem;

  @media (max-width: 620px) {
    margin-left: 1.25rem;
  }
`;

export const NavIconMenu = styled.a`
  display: flex;
  align-items: center;
`;

export const NavIconWrap = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;

  @media (max-width: 767px) {
    width: 1.875rem;
    height: 1.875rem;
  }
`;

export const NavIconText = styled.span`
  font-weight: 700;
  margin-right: 0.5rem;

  @media (max-width: 560px) {
    display: none;
  }
`;

export const Badge = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 0.625rem;
  text-align: center;
  width: 1.0625rem;
  padding: 0.125rem;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  top: -0.25rem;
  right: -0.25rem;
`;
