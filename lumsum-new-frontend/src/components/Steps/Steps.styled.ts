import styled from "styled-components";
import { Steps as AntDSteps } from "antd";

const { Step } = AntDSteps;

export const step = styled(Step)`
  .ant-steps-item-title {
    color: ${({ theme }) => theme.colors.primaryDark} !important;
    font-size: 0.75em;
    font-weight: 700;
    line-height: 1 !important;
  }

  .ant-steps-item-description {
    color: ${({ theme }) => theme.colors.primaryDark} !important;
    font-size: 1em !important;
    line-height: 1;
  }

  .ant-steps-item-icon {
    border-color: ${({ theme }) => theme.colors.primaryGreyish};
    margin-right: 0.5em !important;

    .ant-steps-icon {
      opacity: 0;
    }
  }

  .ant-steps-item-container > .ant-steps-item-tail::after {
    background-color: ${({ theme }) => theme.colors.primaryGreyish};
  }

  &.ant-steps-item-process {
    .ant-steps-item-icon {
      background-color: #fff !important;
      border: 3px solid ${({ theme }) => theme.colors.primary} !important;
    }
  }

  &.ant-steps-item-finish {
    .ant-steps-item-tail::after {
      background-color: ${({ theme }) => theme.colors.primary};
    }
    .ant-steps-item-icon {
      background-color: ${({ theme }) => theme.colors.primary} !important;
      border-color: ${({ theme }) => theme.colors.primary} !important;

      .ant-steps-icon {
        color: #fff;
        opacity: 1;
      }
    }
  }
`;

export const steps = styled(AntDSteps)`
  font-size: 1rem;

  &.ant-steps-vertical .ant-steps-item-description {
    padding-bottom: 4.5em !important;
  }

  &.ant-steps-horizontal {
    display: none;
  }

  @media (max-width: 1023px) {
    &.ant-steps-vertical {
      display: none;
    }

    &.ant-steps-horizontal {
      display: flex;

      & .ant-steps-item-title {
        display: none;
      }

      & .ant-steps-item-tail {
        top: -4px;
      }

      & .ant-steps-icon {
        color: ${({ theme }) => theme.colors.text} !important;
        opacity: 1;
      }

      & .ant-steps-item-process .ant-steps-icon {
        color: ${({ theme }) => theme.colors.primary} !important;
        vertical-align: text-top;
      }

      & .ant-steps-item-finish .ant-steps-icon {
        color: #fff !important;
        vertical-align: initial !important;
      }
    }
  }
`;
