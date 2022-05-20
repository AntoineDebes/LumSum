import styled from "styled-components";

interface textSwitchProps {
  marginBottom?: string;
  active?: boolean;
  hiddenBelowIpad?: boolean;
}

export const TextSwitch = styled.div<textSwitchProps>`
  color: ${({ theme }) => theme.colors.primaryDark};
  text-transform: capitalize;
  width: max-content;
  margin-bottom: ${(props) => props.marginBottom || ".625rem"};
  border: 1px solid ${({ theme }) => theme.colors.borderColorDarker1};
  border-radius: 2rem;
  position: relative;
  display: flex;

  @media (max-width: 1023.98px) {
    ${(props) =>
      props.hiddenBelowIpad == true &&
      `
        {
          display: none;
        }
      `}
  }
`;

export const TextLink = styled.a<textSwitchProps>`
  flex-basis: 50%;
  font-size: 1rem;
  text-align: center;
  white-space: nowrap;
  width: 100%;
  padding: 0.5rem 1rem;
  margin-right: 0;
  position: relative;
  transition: color, 0.2s ease-in;

  &::before {
    content: "";
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    border: 1px solid transparent;
    border-radius: 2rem;
    position: absolute;
    top: -1px;
    left: -1px;
    transition: border-color, 0.2s ease-in;
  }

  ${(props) =>
    props.active == true &&
    `
      {
        color: #00a69c;
        &::before {
          border-color: #00a69c;
        }
      }
    `}
`;
