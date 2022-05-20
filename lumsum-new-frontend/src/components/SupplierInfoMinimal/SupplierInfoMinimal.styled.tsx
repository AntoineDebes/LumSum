import styled from "styled-components";
import Image from "next/image";

export const LogoWrap = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
`;

export const Logo = styled(Image)``;

export const InfoWrap = styled.div`
  flex: 1;
  padding-left: 1.25rem;
`;

export const TitleWrap = styled.div`
  display: flex;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 1rem;
  margin-right: 4em;
`;

export const SupplierInfoMinimal = styled.div`
  display: flex;

  @media (max-width: 767.98px) {
    ${LogoWrap} {
      width: 5rem;
      height: 5rem;
    }
  }
`;
