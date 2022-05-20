import styled from "styled-components";

interface ButtonProps {
  theme?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "medium";
}

export const Button = styled.button<ButtonProps>`
  font-size: 0.875rem;
  font-weight: 700;
  background-color: #ffffff;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  padding: 0.5em 0.875em;
  border: 1px solid #e4e4e4;
  border-radius: 0.25rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all, 0.2s ease-in;
  ${(props) =>
    props.size == "medium" &&
    `
      {
        font-size: 1rem;
      }
    `}
  ${(props) =>
    props.theme == "primary" &&
    `
      {
        color: #ffffff;
        background-color: #00a69c;
        border-color: #00a69c;
      }
    `}
  ${(props) =>
    props.theme == "primaryGhost" &&
    `
      {
        color: #00a69c;
        background-color: #ffffff;
        border-color: #00a69c;
      }
    `}
  ${(props) =>
    props.theme == "highlight" &&
    `
      {
        color: #ffffff;
        background-color: #ffa17a;
        border-color: #ffa17a;
      }
    `}
  ${(props) =>
    props.theme == "ghostPrimary" &&
    `
      {
        color: #00a69c;
        background-color: #ffffff;
        border-color: #00a69c;
      }
    `}
  ${(props) =>
    props.theme == "plain" &&
    `
      {
        background: transparent;
        padding: 0.125rem 0.25rem;
        border: none;
        box-shadow: none;
      
        &:hover,
        &:focus,
        &:active {
          color: #00a69c;
          background-color: #ffffff66;
        }
      }
    `}
  ${(props) =>
    props.theme == "ghost" &&
    `
      {
        color: #005B54;
        background: transparent;
        padding: 0.5em 1em;
        border: 1px solid #aeaeae8a;
        border-radius: 2em;
        box-shadow: none;
      
        &:hover,
        &:focus,
        &:active {
          background-color: #ffffff66;
        }
      }
    `}
  ${(props) =>
    props.theme == "navigator" &&
    `
      {
        font-size: 1rem;
        color: #ffffff;
        background-color: #00a69c;
        width: 15rem;
        padding: 0.875em;
        border: none;
        box-shadow: none;
      }
    `}
    
  ${(props) =>
    props.theme == "navigator" &&
    props.fullWidth &&
    `
      {
        width: 100%;
      }
    `}
    
  ${(props) =>
    props.theme == "navigator" &&
    props.disabled &&
    `
      {
        background-color: #96b1ad9e;
        
        &:hover,
        &:focus,
        &:active {
          background -color: #96b1ad9e;
        }
      }
    `}
`;
