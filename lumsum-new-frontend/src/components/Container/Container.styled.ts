import styled from "styled-components";

interface containerProps {
  header?: "minimal" | "default";
  fluidContainer?: boolean;
  fixedBottom?: boolean;
}

export const Container = styled.div<containerProps>`
  height: 100%;
  max-width: ${(props) => (props.fluidContainer === true ? "100%" : "1360px")};
  padding: 5.5rem 1rem 1rem;
  padding-top: ${(props) => (props.header === "minimal" ? "88px" : "5.5rem")};
  margin: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 1023px) {
    padding-top: ${(props) => (props.header === "minimal" ? "96px" : "163px")};
  }

  @media (max-width: 767px) {
    padding-top: ${(props) => (props.header === "minimal" ? "72px" : "138px")};
  }

  ${(props) =>
    props.fixedBottom &&
    `
      @media (max-width: 767.98px) {
        padding-bottom: 5rem;
      }
    `}
`;
