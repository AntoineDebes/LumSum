import styled from "styled-components";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Price from "@/components/Price/Price";

export const ProductOverview = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr;
  grid-gap: 0.875rem;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-gap: 1.5rem;
  }
`;

export const ImageBlock = styled.div``;

export const ProductImageWrap = styled.div`
  position: relative;
  padding: 50%;
`;

export const ProductImage = styled(Image)``;

export const InfoBlock = styled.div``;

export const TitleWrap = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 1199px) {
    flex-direction: column;
    gap: 0;
    margin-bottom: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;

  @media (max-width: 1199px) {
    margin-bottom: 0.5rem;
  }
`;

export const ProductPrice = styled(Price)`
  font-size: 1.5rem;
  margin: 1.5rem 0 -0.5rem;
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.5;
`;

export const TextList = styled.ul`
  margin: 2.5rem 0 2rem;
`;

export const TextListLi = styled.li`
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.25em;

  &::before {
    content: "*";
    margin-right: 1ch;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ButtonAddToCart = styled(Button)`
  display: inline-flex;
  margin: 2.5rem 0 1.25rem;
`;

export const ButtonAddToCartLink = styled(Button)`
  display: inline-flex;
  margin: 2.5rem 0 1.25rem;
`;

export const IconLinkWrap = styled.div`
  font-size: 0.875rem;
  margin-bottom: 0.75em;
  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const IconWrap = styled.div`
  display: flex;
  margin-right: 1ch;
`;

export const IconLinkImage = styled(Image)``;

export const IconLinkLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.875rem;
`;
