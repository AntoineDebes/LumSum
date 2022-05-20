import { MouseEventHandler } from "react";
import * as S from "./InfoCard.styled";
import Image from "next/image";

interface IProps {
  addType?: boolean;
  clickable?: boolean;
  text?: string;
  key?: string;
  id?: string;
  isSelected?: boolean;
  onChange?: Function;
  onClick?: MouseEventHandler<HTMLDivElement>;
  data?: {
    info: {
      title: string;
      text?: string | number;
      isInput?: boolean;
    }[];
    buttons?: {
      text: string;
      theme: string;
      onClickHandler: any;
    }[];
  };
}

const InfoCardPlain = ({ data }: IProps) => {
  return (
    <S.infoCard>
      {data?.info.map((data, index) => {
        return (
          <S.DataRow key={index}>
            <S.DataTh>{data.title}</S.DataTh>
            <S.DataTd>{data.text}</S.DataTd>
          </S.DataRow>
        );
      })}
      {data?.buttons ? (
        <S.InfoCardButtonWrap>
          {data.buttons.map((button, index) => {
            return (
              <S.InfoCardButton
                theme={button.theme ? button.theme : `default`}
                onClick={() => button.onClickHandler()}
                key={index}
              >
                {button.text}
              </S.InfoCardButton>
            );
          })}
        </S.InfoCardButtonWrap>
      ) : (
        ""
      )}
    </S.infoCard>
  );
};

export default InfoCardPlain;
