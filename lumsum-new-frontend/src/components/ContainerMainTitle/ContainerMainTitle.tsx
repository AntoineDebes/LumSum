import * as S from "./ContainerMainTitle.styled";
import { ReactNode } from "react";

interface ContainerProps {
  descriptionLike?: boolean;
  subTitle?: ReactNode;
  children: ReactNode;
}

const ContainerMainTitle = ({
  descriptionLike,
  subTitle,
  children,
  ...props
}: ContainerProps) => {
  return (
    <S.ContainerMainTitle descriptionLike={descriptionLike} {...props}>
      {children}
      {subTitle && <S.SubText>{subTitle}</S.SubText>}
    </S.ContainerMainTitle>
  );
};

export default ContainerMainTitle;
