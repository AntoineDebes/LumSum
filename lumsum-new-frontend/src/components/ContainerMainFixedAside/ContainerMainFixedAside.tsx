import * as S from "./ContainerMainFixedAside.styled";
import { ReactNode } from "react";

interface ContainerProps {
  rightAside?: boolean;
  children: ReactNode;
}

const ContainerMainFixedAside = ({
  rightAside,
  children,
  ...props
}: ContainerProps) => {
  return (
    <S.ContainerMainFixedAside rightAside={rightAside} {...props}>
      {children}
    </S.ContainerMainFixedAside>
  );
};

export default ContainerMainFixedAside;
