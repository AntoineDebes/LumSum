import SellerLegacy from "@/components/SellerLegacy/SellerLegacy";
import RatingOverview from "@/components/RatingOverview/RatingOverview";
import Price from "@/components/Price/Price";
import Location from "@/components/Location/Location";
import * as S from "./ProductCard.styled";
import Link from "next/link";
import Image from "next/image";

interface IProps {
  data: {
    name: string;
    url: string;
    price: number;
    currency: string;
    image: {
      productImage: StaticImageData;
    };
    imageAlt: string;
    review: {
      verdict: string;
      count: number;
    };
    supplier: string;
    supplierLogo: {
      supplierLogo: StaticImageData;
    };
    supplierLocation: string;
    supplierReview: {
      verdict: string;
      count: number;
    };
    supplierLegacy: {
      value: number;
      units: string;
    };
  };
}

const sellerRating = {
  rating: 3,
  count: 33,
};

const productRating = {
  rating: 4.5,
  count: 1333,
};

const ProductCard = ({ data }: IProps) => {
  return (
    <Link href={data.url}>
      <S.ProductCard title={`${data.name} sold by ${data.supplier}`}>
        <S.BlockInfo>
          <S.BlockInfoLabel as="h5">Sold By</S.BlockInfoLabel>
          <S.BlockImageWrap>
            <Image
              src={data.supplierLogo.supplierLogo.src}
              alt={data.supplier}
              layout="fill"
            />
          </S.BlockImageWrap>
          <S.BlockInfoWrap>
            <S.BockInfoTitleWrap>
              <S.BlockInfoTitle>{data.supplier}</S.BlockInfoTitle>
              <SellerLegacy
                value={data.supplierLegacy.value}
                unit={data.supplierLegacy.units}
              />
            </S.BockInfoTitleWrap>
            <RatingOverview marginBottom=".5rem" rating={sellerRating} />
            <Location location={data.supplierLocation} />
          </S.BlockInfoWrap>
        </S.BlockInfo>
        <S.BlockInfo>
          <S.BlockImageWrap>
            <Image
              src={data.image.productImage.src}
              alt={data.imageAlt}
              layout="fill"
            />
          </S.BlockImageWrap>
          <S.BlockInfoWrap>
            <S.BlockInfoTitle>{data.name}</S.BlockInfoTitle>
            <RatingOverview marginBottom=".5rem" rating={productRating} />
            <Price price={data.price} />
          </S.BlockInfoWrap>
        </S.BlockInfo>
      </S.ProductCard>
    </Link>
  );
};

export default ProductCard;
