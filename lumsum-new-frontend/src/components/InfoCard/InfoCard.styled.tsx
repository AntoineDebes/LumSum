import Button from "@/components/Button/Button";
import { Input as AntDInput, Radio as AntDRadio } from "antd";
import { MouseEventHandler } from "react";
import ButtonWrap from "@/components/ButtonWrap/ButtonWrap";
import iconTick from "@/assets/images/tick.svg";
import styled from "styled-components";

interface infoCardProps {
  addType?: boolean;
  clickable?: boolean;
  icon?: any;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const infoCard = styled.div<infoCardProps>`
  background: #ffffff;
  display: flex;
  border-radius: 0.75rem;
  box-shadow: 0 5px 6px ${({ theme }) => theme.colors.boxShadowColor};
  width: 100%;
  max-width: 24rem;
  padding: 1.25rem;
  font-size: 1rem;
  display: block;

  ${(props) =>
    props.addType &&
    `
      {
        padding: 3.25rem 1.25rem;
        font-size: .875rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    `}

  ${(props) =>
    props.clickable &&
    `
      {
        cursor: pointer;
      }
    `}
`;

export const header = styled.div`
  display: flex;
  align-items: center;
`;

export const headerLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const title = styled.h3`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textDark};
`;

export const iconWrap = styled.div`
  position: relative;
  width: 1.5em;
  height: 1.5em;
  margin-right: 0.375em;
`;

export const radio = styled(AntDRadio)`
  margin-right: 0;

  .ant-radio {
    border-radius: 50%;
  }

  .ant-radio-inner {
    height: 1.375em;
    width: 1.375em;
    border-color: ${({ theme }) => theme.colors.primaryGreyish};
    border-radius: 50%;
  }

  .ant-radio-checked {
    background: ${`url(${iconTick.src})`} ${({ theme }) => theme.colors.primary}
      center/60% no-repeat;

    .ant-radio-inner {
      opacity: 0;
    }
  }
`;

export const body = styled.div`
  margin-top: 1.25rem;
`;

export const table = styled.table`
  font-size: 0.875rem;
  margin-bottom: -1.125em;
`;

export const tableTd = styled.td`
  padding-bottom: 1.125em;
`;

export const tableTh = styled.th`
  color: ${({ theme }) => theme.colors.secondary};
  text-align: left;
  width: 7.5em;
  padding-bottom: 1.125em;
  vertical-align: top;
`;

export const input = styled(AntDInput)`
  font-size: 1em;
  width: 5em;
  border-color: ${({ theme }) => theme.colors.borderColorDarker2};
`;

export const InfoCardButtonWrap = styled(ButtonWrap)`
  gap: 1em;
  justify-content: flex-start;
  margin-top: 1.625rem;
`;

export const InfoCardButton = styled(Button)`
  font-size: 0.8125rem;
  padding-top: 0.625em;
  padding-bottom: 0.625em;
`;
