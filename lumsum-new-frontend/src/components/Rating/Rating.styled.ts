import styled from "styled-components";
import { Radio } from "antd";

import ICON_AMAZING from "@/assets/images/smileys/amazing.svg";
import ICON_BAD from "@/assets/images/smileys/bad.svg";
import ICON_GOOD from "@/assets/images/smileys/good.svg";
import ICON_GREAT from "@/assets/images/smileys/great.svg";
import ICON_NOT_GOOD from "@/assets/images/smileys/not-good.svg";

interface RatingProps {
  size?: string;
}

export const Rating = styled.div<RatingProps>``;

export const RatingRadioGroup = styled(Radio.Group)`
  display: flex;
  grid-gap: 0.75rem;

  .ant-radio-wrapper {
    position: relative;
    width: 1.75rem;
    height: 1.75rem;
    margin-right: 0;
    background: ${`url(${ICON_BAD.src})`} center/contain no-repeat;
    transition: "background 0.2s ease-in";

    &:nth-child(1) {
      background-image: ${`url(${ICON_BAD.src})`};
    }

    &:nth-child(2) {
      background-image: ${`url(${ICON_NOT_GOOD.src})`};
    }

    &:nth-child(3) {
      background-image: ${`url(${ICON_GOOD.src})`};
    }

    &:nth-child(4) {
      background-image: ${`url(${ICON_GREAT.src})`};
    }

    &:nth-child(5) {
      background-image: ${`url(${ICON_AMAZING.src})`};
    }

    filter: grayscale(0.98) brightness(1.13);

    transition: filter, 0.2s ease-in;
  }

  .ant-radio-wrapper-checked {
    filter: none;
  }

  .ant-radio {
    position: absolute;
    opacity: 0;

    + span {
      font-size: 0;
      padding: 0;
    }
  }

  ${(props) =>
    props.size === "large" &&
    `
     {
      grid-gap: 1.25rem;
    }

    .ant-radio-wrapper {
      width: 2.75rem;
      height: 2.75rem;
    }
  `}
`;
