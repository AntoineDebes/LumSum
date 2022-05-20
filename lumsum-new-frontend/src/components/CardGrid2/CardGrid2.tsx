import * as S from "./CardGrid2.styled";
import { ReactNode } from "react";

interface CardGrid2Props {
  children: ReactNode;
}

const CardGrid2 = ({ children, ...props }: CardGrid2Props) => {
  return <S.CardGrid2 {...props}>{children}</S.CardGrid2>;
};

export default CardGrid2;
