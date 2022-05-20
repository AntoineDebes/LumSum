import * as S from "./ButtonWrap.styled";
import { ReactNode } from "react";

interface ButtonWrapProps {
  marginTop?: string;
  fixedInMobile?: boolean;
  theme?: string;
  children: ReactNode;
}

const ButtonWrap = ({
  marginTop,
  fixedInMobile,
  theme,
  children,
  ...props
}: ButtonWrapProps) => {
  return (
    <S.ButtonWrap
      marginTop={marginTop}
      fixedInMobile={fixedInMobile}
      theme={theme}
      {...props}
    >
      {children}
    </S.ButtonWrap>
  );
};

export default ButtonWrap;
