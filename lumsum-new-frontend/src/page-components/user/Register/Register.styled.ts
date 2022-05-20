import styled from "styled-components";
import { Radio as AntDRadio } from "antd";

export const Disclaimer = styled.div`
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 1rem;
`;

export const DisclaimerText = styled.p`
  text-align: center;
  font-size: 0.625rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const DisclaimerLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
`;

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const Radio = styled(AntDRadio.Group)`
  @media (max-width: 380px) {
    display: flex;
    flex-direction: column;
  }

  .ant-radio-button-wrapper {
    height: auto;
    padding: 0.5rem 1rem;

    @media (max-width: 380px) {
      padding: 0.375rem 1rem;

      & {
        border-bottom: 1px solid transparent;

        &:last-child {
          border-bottom: 1px solid #d9d9d9;

          &.ant-radio-button-wrapper-checked {
            border-color: ${({ theme }) => theme.colors.primary};
          }
        }
      }
    }
  }
`;
