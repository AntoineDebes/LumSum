import styled from "styled-components";
import { Progress as AntDProgress } from "antd";

export const ProgressWrap = styled.div`
  width: 100%;
  max-width: 37.5rem;
`;

export const Progress = styled(AntDProgress)`
  .ant-progress-outer {
    padding: 0;
    margin: 0;
  }

  .ant-progress-inner {
    background-color: ${({ theme }) => theme.colors.borderColorDarker5};
  }

  .ant-progress-bg {
    background-color: ${({ theme }) => theme.colors.primaryLight2};
  }

  .ant-progress-text {
    display: none;
  }
`;

export const ProgressStatus = styled.h5`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 0.375rem;
`;
