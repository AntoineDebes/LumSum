import * as S from "./SellerLegacy.styled";

interface IProps {
  value: number;
  unit: string;
  fontSize?: string;
}

const SellerLegacy = ({ value, unit, fontSize }: IProps) => {
  return (
    <S.SellerLegacy fontSize={fontSize}>
      {value}
      <S.SellerLegacyUnits>{unit}</S.SellerLegacyUnits>
    </S.SellerLegacy>
  );
};

export default SellerLegacy;
