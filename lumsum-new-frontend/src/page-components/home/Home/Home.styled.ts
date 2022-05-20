import { Carousel } from "antd";
import Image from "next/image";
import styled from "styled-components";

export const CarouselWrapper = styled(Carousel)`
  margin: 0 -1rem;

  > .slick-dots-bottom {
    bottom: 45px;
  }
  > .slick-dots li {
    margin-right: 12px;
    margin-left: 12px;
  }
  > .slick-dots li button {
    width: 28px;
    height: 8px;
  }
  > .slick-dots li.slick-active button {
    width: 34px;
    height: 10px;
    background: ${({ theme }) => theme.colors.primaryLight2};
  }
  @media screen and (max-width: 700px) {
    > .slick-dots-bottom {
      bottom: 50px;
    }
  }
`;

export const ContainerInnerWrap = styled.div`
  width: 100%;
  max-width: 83rem;
  margin: 0 auto;
`;
export const BannerTitle = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  text-align: start;
  @media (max-width: 767px) {
    font-size: 2rem;
  }
`;

export const BannerText = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  max-width: 45rem;
  line-height: 1.5em;
  margin-top: 1.5em;
  margin-bottom: 1.3em;
  transition: all 1s;
  @media screen and (max-width: 1080px) {
    max-width: 37rem;
  }
  @media (max-width: 768px) {
    transition: all 1s;
    font-size: 1.125rem;
    max-width: 23rem;
  }
`;

export const BannerTitleSub = styled.span`
  position: relative;

  &::after {
    content: "";
    background: ${({ theme }) => theme.colors.primary};
    width: 100%;
    height: 4px;
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: 0.25rem;
  }
`;

export const BannerLinkWrap = styled.div`
  display: flex;
  @media (max-width: 768px) {
    max-width: 23rem;
  }
`;

interface BannerLinksProps {
  primary?: boolean;
}
export const BannerLinks = styled.a<BannerLinksProps>`
  color: ${({ theme }) => theme.colors.primary};
  background: #fff;
  text-align: center;
  padding: 0.35em 2.6em;
  border-radius: 3px;
  font-size: 1.5em;

  & + & {
    margin-left: 2rem;
  }

  ${(props) =>
    props.primary &&
    `
         {
          color: #fff;
          background: #00a69c;
        }
      `}

  @media (max-width: 768px) {
    padding: 0.4em 2.2em;
    border-radius: 0.375em;
    font-size: 1.1em;
    & + & {
      margin-left: 2rem;
    }
  }
  @media (max-width: 365px) {
    padding: 0.4em 1.4em;
    & + & {
      margin-left: 1rem;
    }
  }
  @media (max-width: 297px) {
    padding: 0.4em 1em;
    & + & {
      margin-left: 0.75rem;
    }
  }
`;

interface BannerProps {
  background: StaticImageData;
}
export const Banner = styled.div<BannerProps>`
  background-image: url(${(props) => props.background.src}),
    linear-gradient(
      128.2deg,
      rgb(242 242 243) 40%,
      #cce3f4 calc(100% - 27rem),
      rgb(242, 242, 243) calc(100% - 27rem),
      rgb(242, 242, 243) 100%
    );
  background-repeat: no-repeat, no-repeat;
  background-size: 35rem, cover;
  background-position: right bottom, center;
  height: calc(80vh - 80px);
  min-height: 35rem;
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
  }

  @media screen and (min-width: 1600px) {
    padding: 6rem 7.5vw;
  }

  @media screen and (max-width: 1080px) {
    background-image: url(${(props) => props.background.src}),
      linear-gradient(
        128.2deg,
        rgb(242 242 243) 40%,
        #cce3f4 calc(100% - 22rem),
        rgb(242, 242, 243) calc(100% - 22rem),
        rgb(242, 242, 243) 100%
      );
    background-size: 28.5rem, cover;
    padding: 3rem 2rem;
  }

  @media screen and (max-width: 1023px) {
    height: calc(80vh - 163px);
    min-height: unset;
  }

  @media screen and (max-width: 810px) {
    background-image: url(${(props) => props.background.src}),
      linear-gradient(
        128.2deg,
        rgb(242 242 243) 40%,
        #cce3f4 calc(100% - 16rem),
        rgb(242, 242, 243) calc(100% - 16rem),
        rgb(242, 242, 243) 100%
      );
    background-size: 21rem, cover;
  }

  @media (max-width: 768px) {
    background-image: url(${(props) => props.background.src}),
      linear-gradient(
        128.2deg,
        rgb(242 242 243) 40%,
        #cce3f4 calc(100% - 14rem),
        rgb(242, 242, 243) calc(100% - 14rem),
        rgb(242, 242, 243) 100%
      );
    background-size: 18rem, cover;
    height: calc(90vh - 163px);
  }

  @media (max-width: 767px) {
    padding: 3rem 1rem;
    height: calc(90vh - 127px);
  }

  @media (max-width: 425px) {
    padding: 2.5rem 1rem;
    height: calc(95vh - 127px);
  }
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

export const HomeSectionBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
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

export const HowItWorksCards = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: row;
`;

export const HowItWorksCardsImageWrap = styled.div`
  position: relative;
  width: 4rem;
  height: 4rem;
  flex-basis: 4rem;
  margin-right: 1rem;
  @media (max-width: 540px) {
    width: 5rem;
    height: 5rem;
    flex-basis: 5rem;
  }
`;

export const HowItWorksCardsTextWrap = styled.div`
  flex: 1;
`;

export const HowItWorksCardsTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  font-weight: 700;
`;

export const HowItWorksCardsText = styled.p`
  margin-bottom: 0;
  font-size: 1.1rem;
`;

export const HowItWorksCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

// clients

export const ClientCards = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const GreyImg = styled(Image)`
  filter: grayscale(100%);
`;
export const ClientsTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 3em;
  margin-top: 3em;
`;

export const ClientImageWrap = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;

  img {
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
  }
  @media (max-width: 480px) {
    width: 100%;
    height: 2rem;
  }
`;

export const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 2rem 1rem;

  @media (max-width: 768px) {
    grid-gap: 1.5rem 1rem;
  }

  @media (max-width: 480px) {
    grid-gap: 1rem 1rem;
  }
`;
