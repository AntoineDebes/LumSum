import * as S from "./OrderSummaryCard.styled";

import ProductInfoPreview from "@/components/ProductInfoPreview/ProductInfoPreview";
import useCartItemsStore from "@/store/useCartItemsStore";

interface IProps {
  data: {
    orderNumber: number;
    isVerified?: boolean;
    orderTotal: string;
    items: {
      name: string;
      url: string;
      price: number;
      currency: string;
      image: {
        productImage: StaticImageData;
      };
      imageAlt: string;
      supplier: string;
      supplierLogo: {
        supplierLogo: StaticImageData;
      };
      supplierLocation: string;
      orderNumber?: string;
    }[];
  };
}

const OrderSummaryCard = ({ data }: IProps) => {
  const products = useCartItemsStore((state) => state.cartItems);
  let sum = 0;
  products.map((product: { quantity: number; price: number }) => {
    let count = product.quantity * product.price;
    sum += count;
  });

  return (
    <S.OrderSummaryCard>
      <S.Table>
        <tbody>
          <tr>
            <S.TableTh>Order No.</S.TableTh>
            <S.TableTd>
              <S.OrderNumberWrap>
                {data.orderNumber}
                {data.isVerified && <S.Verfied />}
              </S.OrderNumberWrap>
            </S.TableTd>
          </tr>
          <tr>
            <S.TableTh>Order Total</S.TableTh>
            <S.TableTd>AED {sum}</S.TableTd>
          </tr>
        </tbody>
      </S.Table>
      {products.length !== 0 && (
        <S.OrderItemList>
          {products.map((product: any, index) => {
            return (
              <S.OrderItemListLi key={product.orderNumber + index || "8978667677" + index}>
                <ProductInfoPreview data={product} />
              </S.OrderItemListLi>
            );
          })}
        </S.OrderItemList>
      )}
    </S.OrderSummaryCard>
  );
};

export default OrderSummaryCard;
