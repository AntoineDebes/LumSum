import { createGlobalStyle } from "styled-components";
import { ThemeType } from "./theme";

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html {
    /* font-size: 15px; */
    /* need to scale down the individual fonts */
  }

  body {
    font: 400 1rem/1.3 ${({ theme }) => theme.font};
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.colors.textDark};
    font-weight: 700;
  }

  h1 {
    font-size: 1.383rem;
  }

  h2 {
    font-size: 1.296rem;
  }

  h3 {
    font-size: 1.215rem;
  }

  h4 {
    font-size: 1.138rem;
  }

  h5 {
    font-size: 1.067rem;
  }

  h1:last-child,
  h2:last-child,
  h3:last-child,
  h4:last-child,
  h5:last-child,
  h6:last-child {
    margin-bottom: 0;
  }

  small,
  .text_small {
    font-size: 0.937rem;
  }

  #__next,
  .ant-layout {
    min-height: 100vh;
    background: #fff;
  }

  ul, ol, li {
    padding: 0;
    margin: 0;
  }

  /* utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .ant-btn {
    display: flex;
  }

  .icon-wrap {
    display: flex;
  }

  .ant-dropdown {
    a {
      padding-right: 2rem;
      padding-left: 2rem;

      > div {
        margin-right: 1em !important;
      }
    }
  }

  .ant-input {
    border-color: #707070;
  }

  .ant-input:hover,
  .ant-input:focus,
  .ant-input:active {
    border-color: #00a69c;
  }

  .ant-input:focus {
    box-shadow: 0 0 0 2px #00a69c33;
  }

  .ant-layout-content {
    min-height: 100vh;
  }

  .swiper-pagination {
    position: relative;
    bottom: 0;
    margin-top: 1.125rem;
    margin-bottom: 1.125rem;

    .swiper-pagination-bullet {
      border: 1px solid ${({ theme }) => theme.colors.borderColorDarker2};
      width: .75rem;
      height: .75rem;
      background: #ffffff;
    }

    .swiper-pagination-bullet-active {
      background-color: ${({ theme }) => theme.colors.primary};
      border: none;
    }
  }

  .swiper-slide {
    width: auto !important;
  }
`;

export default GlobalStyle;
