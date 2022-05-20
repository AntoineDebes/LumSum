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
  icon?: any;
  onChange?: Function;
  onClick?: MouseEventHandler<HTMLDivElement>;
  data?: {
    title: string;
    radio?: {
      isPresent: boolean;
      isSelected?: boolean;
    };
    info: {
      title: string;
      text?: string | number;
      isInput?: boolean;
    }[];
    buttons?: {
      text: string;
      theme: string;
      onClickHandler?: any;
    }[];
  };
}

const InfoCard = ({
  data,
  icon,
  addType,
  clickable,
  text,
  id,
  isSelected,
  onChange,
  onClick,
}: IProps) => {
  return addType ? (
    <S.infoCard clickable={clickable} addType onClick={onClick}>
      {text}
    </S.infoCard>
  ) : (
    <S.infoCard
      clickable={clickable}
      icon
      onClick={() => {
        data?.radio ? onChange && onChange(id) : {};
      }}
    >
      <S.header>
        <S.headerLeft>
          <S.iconWrap>
            <Image src={icon} layout="fill" />
          </S.iconWrap>
          <S.title>{data?.title}</S.title>
        </S.headerLeft>
        {data?.radio && (
          <div>
            <S.radio
              // onChange={() => onChange && onChange(id)}
              name="info"
              checked={isSelected}
              value={data?.title}
            />
          </div>
        )}
      </S.header>
      <S.body>
        <S.table>
          <tbody>
            {data?.info.map((data, index) => {
              return data.isInput ? (
                isSelected ? (
                  <tr key={index}>
                    <S.tableTh>{data.title}</S.tableTh>
                    <S.tableTd>
                      <S.input />
                    </S.tableTd>
                  </tr>
                ) : (
                  ""
                )
              ) : (
                <tr key={index}>
                  <S.tableTh>{data.title}</S.tableTh>
                  <S.tableTd>{data.text}</S.tableTd>
                </tr>
              );
            })}
          </tbody>
        </S.table>
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
      </S.body>
    </S.infoCard>
  );
};

export default InfoCard;
