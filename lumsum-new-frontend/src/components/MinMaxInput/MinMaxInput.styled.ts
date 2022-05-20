import styled from "styled-components";
import { Input as AntDInput } from "antd";

export const minMaxInput = styled.div`
  display: flex;
  align-items: center;
`;

export const inputFields = styled(AntDInput)`
  font-size: 0.75rem;
  width: 5rem;
  border-color: ${({ theme }) => theme.colors.borderColorDarker2};
  margin-right: 1em;
`;

export const seperator = styled.span`
  color: ${({ theme }) => theme.colors.textVeryLightGrey};
  font-size: 0.75rem;
  font-weight: 700;
  display: inline-block;
  margin-right: 1em;
`;
