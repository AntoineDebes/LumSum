import { useState } from "react";
import * as S from "./TextSwitch.styled";

interface IProps {
  labels: string[];
  name: string;
  id?: string;
}

const TextSwitch = ({ labels }: IProps) => {
  const options: string[] = [labels[0], labels[1]];

  const [selected, setSelected] = useState(labels[0]);

  const onChange = (e: any) => {
    setSelected(e.target.value);
  };

  return (
    <S.TextSwitch options={options} onChange={onChange} value={selected} />
  );
};

export default TextSwitch;
