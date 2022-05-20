// TODO: cleanup needed

import Button from "@/components/Button/Button";
import ButtonWrap from "@/components/ButtonWrap/ButtonWrap";
import { Input as AntDInput, Radio as AntDRadio } from "antd";
import { MouseEventHandler } from "react";
import iconTick from "@/assets/images/tick.svg";
import styled from "styled-components";

interface infoCardProps {
  addType?: boolean;
  clickable?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const infoCard = styled.div<infoCardProps>`
  font-size: 1rem;
  background: #ffffff;
  width: 100%;
  max-width: 30rem;
  padding: 1.25rem;
  border-radius: 0.75rem;
  box-shadow: 0 5px 6px ${({ theme }) => theme.colors.boxShadowColor};
  display: block;
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

export const title = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textDark};
`;

export const iconWrap = styled.div`
  position: relative;
  width: 1.5em;
  height: 1.5em;
  margin-right: 0.375em;
`;

export const body = styled.div``;

export const Data = styled.div`
  font-size: 1rem;
  margin-bottom: -1.125em;
`;

export const DataRow = styled.div`
  display: flex;

  & + & {
    margin-top: 1rem;
  }

  @media (max-width: 30rem) {
    flex-direction: column;
  }
`;

export const DataTd = styled.div`
`;

export const DataTh = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  text-align: left;
  flex: 0 0 9em;

  @media (max-width: 30rem) {
    flex: unset;
    margin-bottom: .2em;
  }
`;

export const InfoCardButtonWrap = styled(ButtonWrap)`
  gap: 1em;
  justify-content: flex-start;
  margin-top: 1.625rem;
`;

export const InfoCardButton = styled(Button)`
  /* font-size: 0.8125rem; */
  padding-top: 0.625em;
  padding-bottom: 0.625em;
`;
