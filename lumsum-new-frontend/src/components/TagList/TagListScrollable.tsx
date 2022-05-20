import * as S from "./TagList.styled";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

interface IProps {
  tags: string[];
  colorTheme?: string;
}

const TagListScrollable = ({ tags, colorTheme, ...props }: IProps) => {
  return (
    <S.Container {...props}>
      <Swiper
        modules={[Pagination]}
        spaceBetween={8}
        slidesPerView={"auto"}
        tag="ul"
      >
        <S.TagList>
          {tags.map((tag, index) => {
            return (
              <SwiperSlide
                tag="li"
                style={{ width: "auto !important" }}
                key={index}
              >
                <S.TagListTag colorTheme={colorTheme}>{tag}</S.TagListTag>
              </SwiperSlide>
            );
          })}
        </S.TagList>
      </Swiper>
    </S.Container>
  );
};

export default TagListScrollable;
