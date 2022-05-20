import * as S from "./Price.styled";

interface IProps {
  price: number;
}

const Price = ({ price, ...props }: IProps) => {
  const priceString = price.toString().split(".");
  const priceNonDecimal = priceString[0];
  const priceDecimal = priceString[1];

  return (
    <S.Price {...props}>
      <S.PriceCurrency>AED</S.PriceCurrency>
      {priceNonDecimal}
      <S.PriceDecimals>{priceDecimal}</S.PriceDecimals>
    </S.Price>
  );
};

export default Price;
