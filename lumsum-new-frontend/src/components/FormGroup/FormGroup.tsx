import { ReactNode } from "react";
import * as S from "./FormGroup.styled";

interface IProps {
  label: string;
  id?: string;
  placeholder?: string;
  requiredField?: boolean;
  children?: ReactNode;
  noLabel?: boolean;
  noInput?: boolean;
  errors: any;
  touched: any;
}

const FormGroup = ({ label, id, placeholder, requiredField, children, noLabel, noInput, errors, touched }: IProps) => {
  return (
    <S.FormGroup>
      <S.Label htmlFor={id} requiredField={requiredField} srOnly={noLabel}>
        {label}
      </S.Label>
      {!noInput && (
        <S.Field
          name={id}
          id={id}
          placeholder={placeholder}
        />
      )}
      {children}
      {errors.id && touched.id && (
        <S.ErrorMessage>{errors.id}</S.ErrorMessage>
      )}
    </S.FormGroup>
  );
};

export default FormGroup;
