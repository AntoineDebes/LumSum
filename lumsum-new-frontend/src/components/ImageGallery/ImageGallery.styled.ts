import styled from "styled-components";

export const ImageGallery = styled.div`
  .swiper-slide {
    background: #fff;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .swiper-slide {
    background-size: cover;
    background-position: center;

    width: 320px !important; // to override the width auto, need to find a better solution
  }

  .mySwiper2 {
    width: 20rem;
    height: 20rem;
  }

  .mySwiper {
    width: 20rem;
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
  }

  .mySwiper .swiper-slide {
    width: 25% !important;
    height: 100%;
    opacity: 0.4;
  }

  .mySwiper .swiper-slide-thumb-active {
    opacity: 1;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #fff;
    filter: drop-shadow(1px 1px 6px #3b3b3b7d);
  }
`;

export const ThumbnailWrap = styled.div`
  position: relative;
  padding: 50%;
`;
