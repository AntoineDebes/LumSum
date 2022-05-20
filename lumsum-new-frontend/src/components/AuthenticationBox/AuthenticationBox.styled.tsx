import styled from "styled-components";
import { Radio as AntDRadio } from "antd";


interface AlternateOption2Props {
  center: boolean;
}

export const AuthenticationBox = styled.section`
  width: 100%;
  max-width: 29rem;
  padding: 3rem;
  margin: 4rem auto;
  border-radius: 0.5rem;
  box-shadow: 0 3px 6px ${({ theme }) => theme.colors.boxShadowColor};
  align-self: center;

  @media (max-width: 1023px) {
    margin-top: -2rem;
  }

  @media (max-width: 480px) {
    padding: 2rem;
  }

  @media (max-width: 448px) {
    padding: 1.5rem 1rem;
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const Links = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.875rem;
  font-weight: 400;
`;

export const AlternateOption = styled(Links)`
  font-size: 1rem;
  margin-top: 1em;
`;

export const AlternateOption2 = styled.div<AlternateOption2Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  justify-content: ${(props) =>
    props.center === true ? "center" : "space-between"};
  margin-top: 2rem;
`;

export const AlternateOption2Label = styled.div`
  font-size: 0.875rem;
`;

export const AlternateOption2Link = styled(Links)`
  display: flex;
  text-align: center;
`;

export const DividerText = styled.span`
  color: ${({ theme }) => theme.colors.lightGrey2};
  font-size: 0.875rem;
  margin: 2em 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5em;
  position: relative;

  &::before,
  &::after {
    content: "";
    background-color: ${({ theme }) => theme.colors.lightGrey2};
    height: 1px;
    flex: 1;
  }
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
