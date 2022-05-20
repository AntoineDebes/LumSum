import { ReactNode } from "react";
import * as S from "./Form.styled";

interface IProps {
  withPseudoFooter?: boolean;
  children: ReactNode;
}

const Form = ({ withPseudoFooter, children }: IProps) => {
  return (
    <S.Form withPseudoFooter={withPseudoFooter}>
      {children}
    </S.Form>
  );
};

export default Form;
