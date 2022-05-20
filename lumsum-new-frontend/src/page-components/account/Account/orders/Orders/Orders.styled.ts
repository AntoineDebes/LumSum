import styled from "styled-components";
import Button from "@/components/Button/Button";
import RatingCard from "@/components/RatingCard/RatingCard";
import CreditCardIcon from "@/components/CreditCardIcon/CreditCardIcon";
import ProductInfoPreview from "@/components/ProductInfoPreview/ProductInfoPreview";

interface OrdersProps {}

export const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;

  &:empty {
    margin: 0;
  }
`;

export const OrderTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.h4};
  margin: 0 3.25em 0 0;
`;

export const OrderDate = styled.h5`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const SettingsRatingCard = styled(RatingCard)`
  /* margin-top: 1.5rem; */
`;

// order summary

export const OrderCard = styled.div`
  background: #ffffff;
  padding: 1.125rem 1.25rem;
  margin-top: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 5px 6px ${({ theme }) => theme.colors.boxShadowColor};
  display: flex;
  flex-direction: column;
`;

export const InfoBlock = styled.div`
  margin-top: 1rem;
`;

export const InfoTitleLevel1 = styled.h3`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSize.h4};
  font-weight: 700;

  & + cardTitle2Level2 {
    margin-top: 1.125rem;
  }
`;

export const InfoTitleLevel2 = styled.h4`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: ${({ theme }) => theme.fontSize.h5};
  font-weight: 700;
  margin-bottom: 0.25em;
`;

export const InfoText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 0;

  & + & {
    margin-top: 0.25rem;
  }
`;

export const InfoTextCard = styled(InfoBlock)`
  display: flex;
  align-items: center;
`;

export const InfoTextCardIcon = styled(CreditCardIcon)`
  margin-right: 0.25rem;
`;

export const InfoTextFreeShipping = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.875rem;
  text-transform: uppercase;
`;

export const InfoProductInfoPreview = styled(ProductInfoPreview)<OrdersProps>`
  margin-bottom: 1rem;
`;

export const Buttons = styled(Button)`
  margin-top: 1rem;
  font-size: 1rem;
`;

export const FinePrint = styled.span`
  color: ${({ theme }) => theme.colors.primaryGreyish};
`;

export const GotoPreviousLink = styled.a`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-weight: 700;
  margin-bottom: 2rem;
  display: inline-block;
`;

export const List1li = styled.li`
  & + & {
    margin-top: 1.5rem;
  }
`;
