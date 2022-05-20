import * as S from "./ContainerMainContent.styled";
import { ReactNode } from "react";

interface ContainerProps {
  adaptiveWidth?: boolean;
  children: ReactNode;
}

const ContainerMainContent = ({
  adaptiveWidth,
  children,
  ...props
}: ContainerProps) => {
  return (
    <S.ContainerMainContent adaptiveWidth={adaptiveWidth} {...props}>
      {children}
    </S.ContainerMainContent>
  );
};

export default ContainerMainContent;
