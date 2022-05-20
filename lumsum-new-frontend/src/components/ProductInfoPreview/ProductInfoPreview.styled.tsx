import styled from "styled-components";
import Button from "@/components/Button/Button";
import ButtonWrap from "@/components/ButtonWrap/ButtonWrap";
import Image from "next/image";
import QuantityUpdater from "@/components/QuantityUpdater/QuantityUpdater";

interface ProductInfoPreviewProps {
  cardLike?: boolean;
}

export const ProductInfoPreview = styled.div<ProductInfoPreviewProps>`
  display: block;
  ${(props) =>
    props.cardLike &&
    `
      {
        padding: 1rem;
        border-radius: 1rem;
        box-shadow: 0 5px 6px #00000016;
      }
    `}
`;

export const OrderNumber = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.h4};
  color: ${({ theme }) => theme.colors.textDark};
  margin: 0 3.25em 0 0;

  @media (max-width: 540px) {
    margin: 0 0 0.25rem 0;
  }
`;

export const OrderNumberLabel = styled.span`
  display: none;

  @media (max-width: 540px) {
    display: inline;
  }
`;

export const OrderDate = styled.h5`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const OrderDateLabel = styled.span`
  display: none;

  @media (max-width: 540px) {
    display: inline;
  }
`;

export const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.825em;

  &:empty {
    margin: 0;
  }

  @media (max-width: 540px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const OrderItem = styled.div`
  display: flex;

  @media (max-width: 440px) {
    flex-direction: column;
  }
`;

export const ProductImageWrap = styled.div`
  position: relative;
  width: 14rem;
  height: 14rem;
  flex: 0 0 14rem;
  border-radius: 0.25rem;
  overflow: hidden;

  @media (max-width: 767px) {
    width: 10rem;
    height: 10rem;
    flex: 0 0 10rem;
  }

  @media (max-width: 560px) {
    width: 9rem;
    height: 9rem;
    flex: 0 0 9rem;
  }
`;

export const ProductImage = styled(Image)``;

export const ProductInfo = styled.div`
  padding: 2rem 0 0 1rem;
  display: flex;
  align-items: flex-start;

  @media (max-width: 767px) {
    flex-direction: column;
    padding-top: 1rem;
  }

  @media (max-width: 560px) {
    padding-top: 0;
  }

  @media (max-width: 440px) {
    margin-top: 1rem;
    padding-left: 0;
  }
`;

export const ProductTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: ${({ theme }) => theme.fontSize.h4};
  margin: 0 5em 0.5rem 0;

  @media (max-width: 767px) {
    margin-right: 0;
  }
`;

export const ProductInfoText = styled.div`
  margin-bottom: 0.5rem;
`;

export const ProductInfoValue = styled.strong`
  margin-left: 1ch;
`;

export const ProductPrice = styled.div`
  @media (max-width: 767px) {
    margin-top: 0.5rem;
  }
`;

export const ProductPriceValue = styled.strong`
  margin-left: 1ch;
`;

export const SellerInfo = styled.h5`
  font-size: 0.875rem;
  font-weight: 400;
`;

export const SellerName = styled.strong`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-left: 1ch;
`;

export const OrderStatus = styled.h5`
  color: ${({ theme }) => theme.colors.primary};
  text-transform: capitalize;
`;

export const ReviewButtonWrap = styled(ButtonWrap)`
  margin-top: 1rem;
  justify-content: flex-start;
`;

export const Buttons = styled(Button)`
  font-size: 1rem;
`;

export const Quantity = styled(QuantityUpdater)`
  margin-top: 0;
`;

export const VisibleInMobile = styled.div`
  display: none;

  @media (max-width: 767.98px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
    margin-top: 1rem;
  }

  @media (max-width: 384px) {
    gap: unset;
    justify-content: space-between;
  }
`;

export const HiddenInMobile = styled.div`
  display: flex;
  align-items: center;
  gap: 6rem;
  margin-top: 1rem;

  @media (max-width: 767.98px) {
    display: none;
  }
`;
