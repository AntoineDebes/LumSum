import * as S from "./TextSwitchLink.styled";
import Link from "next/link";

interface IProps {
  labels: string[];
  marginBottom?: string;
  value: string;
  hiddenBelowIpad?: boolean;
}

const TextSwitchLink = ({
  labels,
  value,
  marginBottom,
  hiddenBelowIpad,
}: IProps) => {
  const options: string[] = [labels[0], labels[1]];
  return (
    <S.TextSwitch marginBottom={marginBottom} hiddenBelowIpad={hiddenBelowIpad}>
      {options.map((option, index) => {
        return (
          <Link href={`/${option}`} key={index}>
            <S.TextLink active={value === option && true}>{option}</S.TextLink>
          </Link>
        );
      })}
    </S.TextSwitch>
  );
};

export default TextSwitchLink;
