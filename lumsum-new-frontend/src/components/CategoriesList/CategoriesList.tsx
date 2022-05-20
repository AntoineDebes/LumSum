import * as S from "./CategoriesList.styled";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

interface CategoriesListProps {
  data: {
    title: string;
    icon: any;
    url: string;
  }[];
}

const CategoriesList = ({ data }: CategoriesListProps) => {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={0}
      slidesPerView={"auto"}
      pagination={{ clickable: true }}
    >
      {data.map((content, index) => {
        return (
          <SwiperSlide key={index}>
            <S.CategoryCardWrap key={content.title}>
              <Link href={content.url}>
                <S.CategoryCard>
                  <S.CategoryCardImageWrap>
                    <Image src={content.icon} layout="fill" />
                  </S.CategoryCardImageWrap>
                  <S.CategoryCardTitle>{content.title}</S.CategoryCardTitle>
                </S.CategoryCard>
              </Link>
            </S.CategoryCardWrap>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CategoriesList;
