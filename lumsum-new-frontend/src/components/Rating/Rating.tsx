import { RadioChangeEvent } from "antd";
import * as S from "./Rating.styled";

interface IProps {
  size?: "large";
  onChange?: ((e: RadioChangeEvent) => void) | undefined;
  value?: string | number;
}

const Rating = ({ size, onChange, value }: IProps) => {
  const options: { label: string, value: number }[] = [
    { label: "Bad", value: 1 },
    { label: "Not Good", value: 2 },
    { label: "Good", value: 3 },
    { label: "Very Good", value: 4 },
    { label: "Amazing", value: 5 },
  ];

  return (
    <S.Rating size={size}>
      <S.RatingRadioGroup
        size={size}
        options={options}
        onChange={onChange}
        value={value}
      />
    </S.Rating>
  );
};

export default Rating;
