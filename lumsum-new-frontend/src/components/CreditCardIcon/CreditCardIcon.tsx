import * as S from "./CreditCardIcon.styled";
import { CardBrand } from "@/typings/types";
import iconMasterCard from "@/assets/images/payment-options/mastercard.svg";
import iconVisa from "@/assets/images/payment-options/visa.svg";
import Image from "next/image";

// TODO: replace this with a plugin to automatcally detect based on last 4numbers

interface IProps {
  cardBrand: CardBrand;
}

const CreditCardIcon = ({ cardBrand, ...props }: IProps) => {
  let cardIcon = "";
  switch (cardBrand) {
    case "master":
      cardIcon = iconMasterCard;
      break;
    case "visa":
      cardIcon = iconVisa;
      break;
  }

  return (
    <S.IconWrap {...props}>
      <Image src={cardIcon} alt={cardBrand} layout="fill" />
    </S.IconWrap>
  );
};

export default CreditCardIcon;
