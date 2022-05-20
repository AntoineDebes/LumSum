import { MouseEventHandler } from "react";
import * as S from "./InfoCardAddress.styled";
import Image from "next/image";
import iconMapMarker from "@/assets/images/map-marker.svg";

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
  data: {
    id: string,
    firstName: string,
    lastName: string,
    mobileNumber: string,
    addressType?: string,
    // addressType: "Home" | "Projects",
    addressFromMap: string[],
    addressDetails: string,
    isDefault?: boolean,
  };
  buttons?: {
    text: string;
    theme: string;
    onClickHandler: Function;
  }[];
}

const InfoCardAddress = ({
  data,
  radio,
  clickable,
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
            <Image src={iconMapMarker} layout="fill" />
          </S.iconWrap>
          <S.title>
            {data.addressType || "Home"}
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
              <S.tableTd>{`${data.firstName} ${data.lastName}`}</S.tableTd>
            </tr>
            <tr>
              <S.tableTh>Address</S.tableTh>
              <S.tableTd>
                <S.address>
                  <strong>{data.addressDetails}</strong>
                  {data.addressFromMap.map((addressLine, index) => {
                    return (
                      <span key={addressLine + index}>, {addressLine}</span>
                    )
                  })}
                </S.address>
              </S.tableTd>
            </tr>
            <tr>
              <S.tableTh>Phone</S.tableTh>
              <S.tableTd>{data.mobileNumber}</S.tableTd>
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

export default InfoCardAddress;
