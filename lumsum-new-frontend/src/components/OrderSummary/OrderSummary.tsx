import * as S from "./OrderSummary.styled";
import Link from "next/link";
import Aside from "@/components/Aside/Aside";
import Button from "@/components/Button/Button";
import ButtonWrap from "@/components/ButtonWrap/ButtonWrap";
import useCartItemsStore from "@/store/useCartItemsStore";

interface IProps {
  data: {
    currency: string;
    subtotal: number;
    shippingFee: number;
    itemCount: number;
  };
}

const OrderSummary = ({ data }: IProps) => {
  const products = useCartItemsStore((state) => state.cartItems);
  let sum = 0;
  products.map((product: { quantity: number; price: number }) => {
    let count = product.quantity * product.price;
    sum += count;
  });

  return (
    <Aside>
      <S.InnerWrap>
        <S.Title>Order Summary</S.Title>
        <S.DataBlock>
          <S.DataBlockRow>
            <span>
              Subtotal (
              {products.length >= 2
                ? `${products.length} items`
                : `${products.length} item`}
              )
            </span>
            <S.DataBlockValue>
              {data.currency} {sum}
            </S.DataBlockValue>
          </S.DataBlockRow>
          {products.length >= 1 && (
            <S.DataBlockRow>
              <span>Shipping Fee</span>
              <S.DataBlockValue>
                {data.currency} {data.shippingFee}
              </S.DataBlockValue>
            </S.DataBlockRow>
          )}
          <S.DataBlockRowTotal>
            <span>Total</span>
            <S.DataBlockValue>
              {data.currency}{" "}
              {sum + products.length >= 1 ? data.shippingFee : 0}
            </S.DataBlockValue>
          </S.DataBlockRowTotal>
        </S.DataBlock>
        {products.length >= 1 && (
          <ButtonWrap fixedInMobile>
            <Link href="./checkout">
              <Button as="a" theme="navigator" fullWidth>
                Proceed to Buy
              </Button>
            </Link>
          </ButtonWrap>
        )}
      </S.InnerWrap>
    </Aside>
  );
};

export default OrderSummary;
