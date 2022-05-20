import * as S from "./AuthMessage.styled";
import { ReactNode } from "react";
import Container from "@/components/Container/Container";
import ContainerMain from "@/components/Container/Container";

interface ContainerProps {
  header?: "minimal" | "default";
  children: ReactNode;
}

const AuthMessage = ({
  header,
  children,
  ...props
}: ContainerProps) => {
  return (
    <Container
      header={header}
      {...props}
    >
      <ContainerMain>
        {children}
      </ContainerMain>
    </Container>
  );
};

export default AuthMessage;
