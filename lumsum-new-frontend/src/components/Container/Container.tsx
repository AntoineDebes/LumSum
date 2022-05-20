import * as S from "./Container.styled";
import { ReactNode } from "react";

interface ContainerProps {
  header?: "minimal" | "default";
  fluidContainer?: boolean;
  fixedBottom?: boolean;
  children: ReactNode;
}

const Container = ({
  header,
  fluidContainer,
  fixedBottom,
  children,
  ...props
}: ContainerProps) => {
  return (
    <S.Container
      header={header}
      fluidContainer={fluidContainer}
      fixedBottom={fixedBottom}
      {...props}
    >
      {children}
    </S.Container>
  );
};

export default Container;
