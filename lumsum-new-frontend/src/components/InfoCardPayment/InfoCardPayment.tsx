import { MouseEventHandler } from "react";
import * as S from "./InfoCardPayment.styled";
import Image from "next/image";

interface IProps {
  addType?: boolean;
  clickable?: boolean;
  text?: string;
  key?: string;
  id?: string;
  isSelected?: boolean;
  icon?: any;
  radio?: boolean;
  onChange?: Function;
  onClick?: MouseEventHandler<HTMLDivElement>;
  data?: {
    cardholderName: string;
    cardNumber: number;
    cardExpiry: string;
    isDefault?: boolean;
  };
  buttons?: {
    text: string;
    theme: string;
    onClickHandler: Function;
  }[];
}

const InfoCardPayment = ({
  data,
  radio,
  icon,
  addType,
  clickable,
  text,
  id,
  isSelected,
  onChange,
  onClick,
  buttons,
}: IProps) => {
  return (
    <S.infoCard
      clickable={clickable}
      icon
      onClick={() => {
        radio ? onChange && onChange(id) : {};
      }}
    >
      <S.header>
        <S.headerLeft>
          <S.iconWrap>
            <Image src={icon} layout="fill" />
          </S.iconWrap>
          <S.title>
            Card ending in {data?.cardNumber.toString().slice(-4)}
          </S.title>
        </S.headerLeft>
        {radio && (
          <div>
            <S.radio
              // onChange={() => onChange && onChange(id)}
              name="info"
              checked={isSelected}
              value={id}
            />
          </div>
        )}
      </S.header>
      <S.body>
        <S.table>
          <tbody>
            <tr>
              <S.tableTh>Name</S.tableTh>
              <S.tableTd>{data?.cardholderName}</S.tableTd>
            </tr>
            <tr>
              <S.tableTh>Expires</S.tableTh>
              <S.tableTd>{data?.cardExpiry}</S.tableTd>
            </tr>
          </tbody>
        </S.table>
        {buttons ? (
          <S.InfoCardButtonWrap>
            {buttons.map((button, index) => {
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

export default InfoCardPayment;
