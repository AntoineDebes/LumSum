import styled from "styled-components";

interface buttonWrapProps {
  marginTop?: string;
  fixedInMobile?: boolean;
  theme?: string;
}

export const ButtonWrap = styled.div<buttonWrapProps>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.125em;
  justify-content: end;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "2.5rem")};

  ${(props) =>
    props.fixedInMobile &&
    `
      @media (max-width: 767px) {
        background-color: #fff;
        width: 100%;
        padding: 1rem;
        margin: 0;
        border-top: 1px solid #00000016;
        box-shadow: 0 3px 6px #00000016;
        position: fixed;
        bottom: 0;
        left: 0;
        justify-content: center;
      
        button {
          width: 100%;
          max-width: 24rem;
        }
      }
    `}

  ${(props) =>
    props.theme == "inForm" &&
    `
      justify-content: flex-start;
      margin-top: 2.25rem;
    `}
`;
