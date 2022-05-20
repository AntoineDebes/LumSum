import styled, { css } from "styled-components";
import { Field as FormikField } from "formik";

interface labelProps {
  requiredField?: boolean;
  srOnly?: boolean;
}

export const FormGroup = styled.div`
  width: 100%;
  max-width: 26em;
  &:not(:last-child) {
    margin-bottom: 1.5em;
  }
`;

export const Label = styled.label<labelProps>`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-weight: 700;
  display: block;
  margin-bottom: 0.6em;

  ${(props) =>
    props.requiredField &&
    css`
      &::after {
        content: "*";
        color: ${({ theme }) => theme.colors.primary};
        display: inline-block;
        margin-left: 1ch;
      }
    `}

  ${(props) =>
    props.srOnly &&
    `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `}
`;

export const Field = styled(FormikField)`
  width: 100%;
  padding: 0.75em 1em;
  border-radius: 0.5em;
  border: 1px solid ${({ theme }) => theme.colors.borderColorDarker4};
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.highlight1};
  font-size: 0.875em;
  margin-top: 0.25em;
  display: block;
`;
