import RatingOverview from "@/components/RatingOverview/RatingOverview";
import SellerLegacy from "@/components/SellerLegacy/SellerLegacy";
import * as S from "./SupplierInfoMinimal.styled";

import Location from "@/components/Location/Location";
import Image from "next/image";

interface IProps {
  data: {
    title: string;
    logo: StaticImageData;
    location: string;
    review: {
      rating: number;
      count: number;
    };
    legacy: {
      value: number;
      units: string;
    };
    url: string;
  };
}

const SupplierInfoMinimal = ({ data, ...props }: IProps) => {
  return (
    <S.SupplierInfoMinimal {...props}>
      <S.LogoWrap>
        <S.Logo src={data.logo} alt={data.title} layout="fill" />
      </S.LogoWrap>
      <S.InfoWrap>
        <S.TitleWrap>
          <S.Title>{data.title}</S.Title>
          <SellerLegacy
            fontSize=".875rem"
            value={data.legacy.value}
            unit={data.legacy.units}
          />
        </S.TitleWrap>
        <RatingOverview marginBottom=".5rem" rating={data.review} />
        <Location location={data.location} />
      </S.InfoWrap>
    </S.SupplierInfoMinimal>
  );
};

export default SupplierInfoMinimal;
