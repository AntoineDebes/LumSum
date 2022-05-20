import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button/Button";
import * as S from "./EmptyScreen.styled";

interface IProps {
  icon: any;
  iconAlt: string;
  title: string;
  description: string;
  linkUrl: string;
  linkText: string;
}

const EmptyScreen = ({
  icon,
  iconAlt,
  title,
  description,
  linkUrl,
  linkText,
}: IProps) => {
  return (
    <S.EmptyScreen>
      <S.EmptyScreenIcon>
        <Image src={icon} layout="fill" alt={iconAlt} />
      </S.EmptyScreenIcon>
      <S.EmptyScreenTitle>{title}</S.EmptyScreenTitle>
      <S.EmptyScreenText>{description}</S.EmptyScreenText>
      <Link href={linkUrl}>
        {/* <S.EmptyScreenButton theme="primary" as="a">{linkText}</S.EmptyScreenButton> */}
        <Button theme="primary" as="a">
          {linkText}
        </Button>
      </Link>
    </S.EmptyScreen>
  );
};

export default EmptyScreen;
