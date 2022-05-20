import * as S from "./Aside.styled";
import { ReactNode } from "react";

interface AsideProps {
  children: ReactNode;
}

const Aside = ({ children, ...props }: AsideProps) => {
  return <S.Aside {...props}>{children}</S.Aside>;
};

export default Aside;
