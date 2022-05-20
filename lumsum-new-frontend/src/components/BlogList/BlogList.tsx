import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import * as S from "./BlogList.styled";

interface BlogListProps {
  data: {
    title: string;
    icon: any;
  }[];
}

const BlogList = ({ data }: BlogListProps) => {
  return (
    <S.BlogList>
      <Swiper modules={[Pagination]} spaceBetween={18} slidesPerView={"auto"}>
        {data.map((content, index) => {
          return (
            <SwiperSlide key={index}>
              <S.CardBlog
                width="27rem"
                title={content.title}
                icon={content.icon}
                iconAlt=""
                url="/blogs/lighting-fixtures"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </S.BlogList>
  );
};

export default BlogList;
