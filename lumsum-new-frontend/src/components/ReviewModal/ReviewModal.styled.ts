import styled from "styled-components";
import { Modal as AntDModal } from "antd";

export const Modal = styled(AntDModal)`
  overflow: auto;

  .ant-modal-content {
    background-color: transparent;
    display: flex;
    flex-direction: column;
  }

  .ant-modal-close {
    position: relative;
    color: #fff;
    margin-left: auto;
  }

  .ant-modal-header,
  .ant-modal-body,
  .ant-modal-footer {
    background-color: #fff;
    padding: 1.5rem 2rem;
  }

  .ant-modal-header {
    padding-top: 2rem;
    border-bottom: none;
    border-radius: 1rem 1rem 0 0;
  }

  .ant-modal-title {
    font-size: ${({ theme }) => theme.fontSize.h2};
    color: ${({ theme }) => theme.colors.primaryDark};
    font-weight: 700;
  }

  .ant-modal-body {
    flex: 1;
    padding-top: 0;
    overflow: auto;
  }

  .ant-modal-footer {
    display: flex;
    gap: 1.125em;
    justify-content: flex-end;
    border-top: none;
    border-radius: 0 0 1rem 1rem;
  }

  @media (max-width: 1024px) {
    .ant-modal-header {
      padding: 3rem 1rem 0;
      /* border-radius: 0; */
    }
    .ant-modal-close {
      color: ${({ theme }) => theme.colors.borderColorDarker4};
      position: absolute;
      top: 0;
      right: 0;
    }
    .ant-modal-body,
    .ant-modal-footer {
      padding: 1.5rem 1rem;
    }
  }
`;
