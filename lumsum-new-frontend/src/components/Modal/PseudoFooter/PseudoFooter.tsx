import { ReactNode } from "react";
import * as S from "./PseudoFooter.styled";

interface PseudoFooterProps {
  children: ReactNode;
}

const PseudoFooter = ({ children }: PseudoFooterProps) => {
  return <S.PseudoFooter>{children}</S.PseudoFooter>;
};

export default PseudoFooter;
