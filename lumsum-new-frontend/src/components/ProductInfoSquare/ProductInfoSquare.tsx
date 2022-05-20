import RatingOverview from "@/components/RatingOverview/RatingOverview";
import Price from "@/components/Price/Price";
import * as S from "./ProductInfoSquare.styled";
import Image from "next/image";
import Link from "next/link";

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
      rating: number;
      count: number;
    };
  };
}

const ProductInfoSquare = ({ data }: IProps) => {
  return (
    <S.ProductInfoSquare>
      <Link href="/suppliers/supplier1/prod1">
        <S.ProductCardWrap>
          <S.BlockImageWrap>
            <Image
              src={data.image.productImage.src}
              alt={data.imageAlt}
              layout="fill"
            />
          </S.BlockImageWrap>
          <div>
            <S.BlockInfoTitle>{data.name}</S.BlockInfoTitle>
            <RatingOverview marginBottom=".5rem" rating={data.review} />
            <Price price={data.price} />
          </div>
        </S.ProductCardWrap>
      </Link>
    </S.ProductInfoSquare>
  );
};

export default ProductInfoSquare;
