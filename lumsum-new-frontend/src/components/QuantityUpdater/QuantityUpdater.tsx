import * as S from "./QuantityUpdater.styled";

interface IProps {
  productID?: string;
  quantity?: number;
  decrementCount: () => void;
  incrementCount: () => void;
}

const QuantityUpdater = ({
  quantity,
  productID,
  decrementCount,
  incrementCount,
  ...props
}: IProps) => {
  return (
    <S.QuantityUpdater {...props}>
      <S.QuantityButton
        theme="ghost"
        onClick={decrementCount}
        disabled={quantity! < 2}
      >
        -
      </S.QuantityButton>
      <S.QuantityValue>{quantity}</S.QuantityValue>
      <S.QuantityButton theme="ghost" onClick={incrementCount}>
        +
      </S.QuantityButton>
    </S.QuantityUpdater>
  );
};

export default QuantityUpdater;
