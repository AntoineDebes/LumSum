import styled from "styled-components";

interface containerMainContentProps {
  adaptiveWidth?: boolean;
}

export const ContainerMainContent = styled.div<containerMainContentProps>`
  max-width: ${(props) => (props.adaptiveWidth ? "56rem" : "unset")};
`;
