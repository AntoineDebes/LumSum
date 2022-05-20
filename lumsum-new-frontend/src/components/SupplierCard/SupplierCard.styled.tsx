import styled from "styled-components";
import Image from "next/image";
import TagListScrollable from "@/components/TagList/TagListScrollable";

export const Header = styled.div`
  display: flex;
`;

export const LogoWrap = styled.div`
  position: relative;
  padding: 17.5%;
`;

export const Logo = styled(Image)``;

export const InfoWrap = styled.div`
  flex: 1;
  padding-left: 1.25rem;
  min-width: 0;
`;

export const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.h3`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textDark};

  @media (max-width: 1120px) {
    width: 100%;
  }
`;

export const BrandList = styled(TagListScrollable)`
  font-size: 0.75rem;
  margin: 0.875rem 0 0;
`;

export const Body = styled.div`
  margin-top: 0.75rem;
  width: 100%;
`;

export const Slider = styled.div`
  width: 10rem;
`;

export const SwiperWrapper = styled.div``;

export const SliderImageWrap = styled.div`
  height: 4.5rem;
  width: 4.5rem;
  position: relative;

  img {
    object-fit: contain;
  }
`;

export const SupplierCard = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 30rem;
  min-width: 0;
  padding: 0.875rem 1.25rem;
  display: block;
  border-radius: 0.75rem;
  box-shadow: 0 5px 6px ${({ theme }) => theme.colors.boxShadowColor};
  cursor: pointer;

  @media (max-width: 1120px) {
    ${InfoWrap} {
      padding-left: 1rem;
    }

    ${LogoWrap} {
      width: 6rem;
      height: 6rem;
      padding: 0;
    }
  }
`;
