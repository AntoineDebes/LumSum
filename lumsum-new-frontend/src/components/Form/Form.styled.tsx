import styled from "styled-components";
import { Form as FormikForm } from "formik";

interface FormProps {
  withPseudoFooter?: boolean;
}

export const Form = styled(FormikForm) <FormProps>`
  ${(props) =>
    props.withPseudoFooter &&
    `
      {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
    `}
`;
