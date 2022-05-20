import { ReactNode } from "react";
import * as S from "./Button.styled";

interface ButtonProps {
  theme?: string;
  title?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  as?: "a";
  fullWidth?: boolean;
  size?: "medium";
  children: ReactNode;
  onClick?: any;
}

const Button = ({
  theme,
  title,
  type,
  disabled,
  children,
  onClick,
  fullWidth,
  size,
  as,
  ...props
}: ButtonProps) => {
  return (
    <S.Button
      theme={theme}
      title={title}
      type={type}
      as={as}
      fullWidth={fullWidth}
      {...props}
      disabled={disabled}
      size={size}
      onClick={onClick ? onClick : () => { }}
    >
      {children}
    </S.Button>
  );
};

export default Button;
