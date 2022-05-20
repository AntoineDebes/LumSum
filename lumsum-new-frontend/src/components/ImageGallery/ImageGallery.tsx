import { useState } from "react";
import Image from "next/image";
import * as S from "./ImageGallery.styled";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";

SwiperCore.use([FreeMode, Navigation, Thumbs]);

interface IProps {
  images: { src: string }[];
}

const ImageGallery = ({ images }: IProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();
  return (
    <S.ImageGallery>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        className="mySwiper2"
      >
        {images.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <div>
                <Image layout="fill" src={image.src} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        className="mySwiper"
      >
        {images.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <S.ThumbnailWrap>
                <Image layout="fill" src={image.src} />
              </S.ThumbnailWrap>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </S.ImageGallery>
  );
};

export default ImageGallery;
