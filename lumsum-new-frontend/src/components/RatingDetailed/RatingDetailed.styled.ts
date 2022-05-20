import styled from "styled-components";
import { Progress } from "antd";
import Button from "@/components/Button/Button";

import ICON_AMAZING from "@/assets/images/smileys/amazing.svg";
import ICON_BAD from "@/assets/images/smileys/bad.svg";
import ICON_GOOD from "@/assets/images/smileys/good.svg";
import ICON_GREAT from "@/assets/images/smileys/great.svg";
import ICON_NOT_GOOD from "@/assets/images/smileys/not-good.svg";

interface RatingDetailedProps {
  percent: number;
  showInfo?: boolean;
}

export const RatingDetailed = styled.div`
  font-size: 1rem;
  font-weight: 700;
  max-width: 25rem;
`;

export const RatingIcon = styled.span`
  background: ${`url(${ICON_AMAZING.src})`} center/contain no-repeat;
  width: 1.5em;
  height: 1.5em;
  margin-right: 0.5em;
  filter: grayscale(0.98) brightness(1.13);
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.375em;

  &:last-child {
    margin-bottom: 0;
  }

  &:nth-child(2) {
    ${RatingIcon} {
      background-image: ${`url(${ICON_GREAT.src})`};
    }

    .ant-progress-bg {
      background-color: ${({ theme }) => theme.colors.green};
    }
  }

  &:nth-child(3) {
    ${RatingIcon} {
      background-image: ${`url(${ICON_GOOD.src})`};
    }

    .ant-progress-bg {
      background-color: ${({ theme }) => theme.colors.yellow};
    }
  }

  &:nth-child(4) {
    ${RatingIcon} {
      background-image: ${`url(${ICON_NOT_GOOD.src})`};
    }

    .ant-progress-bg {
      background-color: ${({ theme }) => theme.colors.orange};
    }
  }

  &:nth-child(5) {
    ${RatingIcon} {
      background-image: ${`url(${ICON_BAD.src})`};
    }

    .ant-progress-bg {
      background-color: ${({ theme }) => theme.colors.red};
    }
  }
`;

export const RatingProgress = styled(Progress)<RatingDetailedProps>`
  .ant-progress-inner {
    color: ${({ theme }) => theme.colors.grey1};
    border-radius: 0.375em !important;
  }

  .ant-progress-bg {
    background-color: ${({ theme }) => theme.colors.primary};
    height: 1.375em !important;
    border-radius: 0.375em !important;
  }

  .ant-progress-text {
    display: none;
  }
`;

export const RatingInPercentage = styled.span`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 0.875rem;
  width: 4.25ch;
  margin: 0 1em;
`;

export const RatingCount = styled.span`
  color: ${({ theme }) => theme.colors.lightGrey};
  font-size: 0.875rem;
  min-width: 1.5em;
  text-align: right;
  /* color is #C1C0C5 in design but used lightGrey as it lacks contrast */
`;

export const AddButton = styled(Button)`
  font-size: 1rem;
  width: 100%;
  margin-top: 1.875rem;
`;
