import * as S from "./SupplierCard.styled";

import RatingOverview from "@/components/RatingOverview/RatingOverview";
import SellerLegacy from "@/components/SellerLegacy/SellerLegacy";
import Link from "next/link";
import Image from "next/image";
import Location from "@/components/Location/Location";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

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
    brands: string[];
    categories: string[];
    productImages: {
      image: StaticImageData;
      alt: string;
    }[];
    url: string;
  };
}

const SupplierCard = ({ data }: IProps) => {
  return (
    <Link href={data.url}>
      <S.SupplierCard>
        <S.Header>
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
            <S.BrandList tags={data.brands} />
          </S.InfoWrap>
        </S.Header>
        <S.Body>
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={"auto"}
          >
            {data.productImages.map((productImage, index) => {
              return (
                <SwiperSlide key={index}>
                  <S.SliderImageWrap>
                    <Image
                      layout="fill"
                      src={productImage.image.src}
                      alt={productImage.alt}
                    />
                  </S.SliderImageWrap>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <S.BrandList colorTheme="highlight" tags={data.categories} />
        </S.Body>
      </S.SupplierCard>
    </Link>
  );
};

export default SupplierCard;
