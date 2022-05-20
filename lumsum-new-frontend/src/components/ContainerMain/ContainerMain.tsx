import * as S from "./ContainerMain.styled";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const ContainerMain = ({
  children,
  ...props
}: ContainerProps) => {
  return (
    <S.ContainerMain {...props}>
      {children}
    </S.ContainerMain>
  );
};

export default ContainerMain;
