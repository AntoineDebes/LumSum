import { ReactNode } from "react";
import * as S from "./Box.styled";

interface BoxProps {
  id?: string;
  title?: string;
  maxwidth?: string;
  children: ReactNode;
}

const Box = ({ id, title, maxwidth, children }: BoxProps) => {
  return (
    <S.Box id={id} maxwidth={maxwidth}>
      {title && (
        <S.BoxHeader>
          <h2>{title}</h2>
        </S.BoxHeader>
      )}
      <S.BoxBody>{children}</S.BoxBody>
    </S.Box>
  );
};

export default Box;
