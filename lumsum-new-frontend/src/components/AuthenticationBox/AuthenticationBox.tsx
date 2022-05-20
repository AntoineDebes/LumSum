import { ReactNode } from "react";
import Link from "next/link";
import ExternalLogins from "@/components/ExternalLogins/ExternalLogins";
import * as S from "./AuthenticationBox.styled";

interface AuthenticationBoxProps {
  altOptionText?: string;
  altOptionLink: string;
  altOptionLinkText: string;
  children: ReactNode;
}

const AuthenticationBox = ({
  altOptionText,
  altOptionLink,
  altOptionLinkText,
  children,
}: AuthenticationBoxProps) => {
  return (
    <S.AuthenticationBox>
      <ExternalLogins />
      <S.DividerText>or do it via Email</S.DividerText>
      {children}
      <S.AlternateOption2 center={!altOptionText}>
        {altOptionText && (
          <S.AlternateOption2Label>{altOptionText}</S.AlternateOption2Label>
        )}
        <Link href={altOptionLink}>
          <S.AlternateOption2Link>{altOptionLinkText}</S.AlternateOption2Link>
        </Link>
      </S.AlternateOption2>
    </S.AuthenticationBox>
  );
};

export default AuthenticationBox;
