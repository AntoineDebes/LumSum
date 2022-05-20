import styled from "styled-components";
import { Radio } from "antd";
interface textSwitchProps {
  marginBottom?: string;
}

export const TextSwitch = styled(Radio.Group)<textSwitchProps>`
  color: ${({ theme }) => theme.colors.primaryDark};
  text-transform: capitalize;
  width: max-content;
  margin-bottom: ${(props) => props.marginBottom || ".625rem"};
  border: 1px solid ${({ theme }) => theme.colors.borderColorDarker1};
  border-radius: 2rem;
  position: relative;
  display: flex;

  .ant-radio-wrapper {
    flex-basis: 50%;
    font-size: 1rem;
    margin-right: 0;
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

    &:focus-within {
      border-radius: 2rem;
      box-shadow: 0 0 0 3px hsl(176deg 100% 33% / 20%);
    }
  }

  .ant-radio-wrapper-checked {
    color: ${({ theme }) => theme.colors.primary};

    &::before {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  .ant-radio {
    position: absolute;
    opacity: 0;

    & + * {
      text-align: center;
      white-space: nowrap;
      padding: 0.5rem 1rem;
      width: 100%;
    }
  }
`;
