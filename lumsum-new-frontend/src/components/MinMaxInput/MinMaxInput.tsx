import Button from "@/components/Button/Button";
import { ChangeEventHandler } from "react";
import * as S from "./MinMaxInput.styled";

interface IProps {
  minPrice: number;
  maxPrice: number;
  handleMinPriceChange: ChangeEventHandler<HTMLInputElement>;
  handleMaxPriceChange: ChangeEventHandler<HTMLInputElement>;
}

const MinMaxInput = ({ minPrice, maxPrice, handleMinPriceChange, handleMaxPriceChange }: IProps) => {
  return (
    <S.minMaxInput>
      <S.inputFields
        placeholder="Min"
        value={minPrice > 0 ? minPrice : ""}
        onChange={handleMinPriceChange}
      />
      <S.seperator>To</S.seperator>
      <S.inputFields
        placeholder="Max"
        value={maxPrice > 0 ? maxPrice : ""}
        onChange={handleMaxPriceChange}
      />
      <Button theme="plain">Submit</Button>
    </S.minMaxInput>
  );
};

export default MinMaxInput;
