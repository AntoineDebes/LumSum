import * as S from "./ProductInfoPreview.styled";

import { ReactChild, useState } from "react";

import ConditionalWrapper from "@/components/ConditionalWrapper/ConditionalWrapper";
import Image from "next/image";
import Link from "next/link";
import { OrderStatusType } from "@/typings/types";
import ReviewModal from "@/components/ReviewModal/ReviewModal";
import useCartItemsStore from "@/store/useCartItemsStore";

interface IProps {
  cardLike?: boolean;
  showHeader?: boolean;
  adjustQuantity?: boolean;
  decrementCount?: () => void;
  incrementCount?: () => void;
  linked?: boolean;
  data: {
    name: string;
    url: string;
    id?: string;
    price?: number;
    currency?: string;
    orderNumber?: string;
    orderDate?: string;
    orderStatus?: OrderStatusType;
    image: any;
    imageAlt: string;
    quantity?: number;
    supplier: string;
  };
}

const ProductInfoPreview = ({
  data,
  linked,
  cardLike,
  showHeader,
  adjustQuantity,
  decrementCount,
  incrementCount,
}: IProps) => {
  const orderQuantity = useCartItemsStore(
    (state) =>
      state.cartItems.find(
        (cartItem: { id: string }) => cartItem.id === data.id
      )?.quantity
  );

  const deleteCartItem = useCartItemsStore((state) => state.deleteCartItem);

  const [IsReviewModalVisible, setIsReviewModalVisible] = useState(false);

  const showReviewModal = (e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    e.preventDefault();
    e.stopPropagation();
    setIsReviewModalVisible(true);
  };

  const handleOkReviewModal = () => {
    setIsReviewModalVisible(false);
  };

  const handleCancelReviewModal = () => {
    setIsReviewModalVisible(false);
  };

  return (
    <>
      <ConditionalWrapper
        condition={linked}
        wrapper={(children: ReactChild) => (
          <Link href={data.url ? data.url : ""}>
            <a>{children}</a>
          </Link>
        )}
      >
        <S.ProductInfoPreview cardLike={cardLike}>
          {showHeader && (
            <S.InfoHeader>
              <S.OrderNumber>
                <S.OrderNumberLabel>Order&nbsp;</S.OrderNumberLabel>
                {data.orderNumber}
              </S.OrderNumber>
              <S.OrderDate>
                <S.OrderDateLabel>Placed on&nbsp;</S.OrderDateLabel>
                {data.orderDate}
              </S.OrderDate>
            </S.InfoHeader>
          )}
          <S.OrderItem>
            <S.ProductImageWrap>
              <Image
                src={data.image.productImage?.src || data.image[0].src}
                layout="fill"
              />
            </S.ProductImageWrap>
            <S.ProductInfo>
              <div>
                <S.ProductTitle>{data.name}</S.ProductTitle>
                {data.quantity && !adjustQuantity && (
                  <S.ProductInfoText>
                    Quantity:
                    <S.ProductInfoValue>{data.quantity}</S.ProductInfoValue>
                  </S.ProductInfoText>
                )}
                <S.SellerInfo>
                  Sold by
                  <S.SellerName>{data.supplier}</S.SellerName>
                </S.SellerInfo>
                {data.orderStatus && (
                  <S.OrderStatus>{data.orderStatus}</S.OrderStatus>
                )}
                {data.orderStatus === "delivered" && (
                  <S.ReviewButtonWrap>
                    <S.Buttons
                      theme="primaryGhost"
                      onClick={(e: any) => showReviewModal(e)}
                    >
                      Review Product
                    </S.Buttons>
                  </S.ReviewButtonWrap>
                )}
                {adjustQuantity && (
                  <S.HiddenInMobile>
                    <S.Quantity
                      quantity={orderQuantity}
                      productID={data.id}
                      decrementCount={decrementCount!}
                      incrementCount={incrementCount!}
                    />
                    <S.Buttons
                      theme="highlight"
                      onClick={() => deleteCartItem(data.id)}
                    >
                      Remove
                    </S.Buttons>
                  </S.HiddenInMobile>
                )}
              </div>
              {data.price && (
                <S.ProductPrice>
                  {data.currency}
                  {adjustQuantity ? (
                    <S.ProductPriceValue>
                      {orderQuantity! * data.price}
                    </S.ProductPriceValue>
                  ) : (
                    <S.ProductPriceValue>{data.price}</S.ProductPriceValue>
                  )}
                </S.ProductPrice>
              )}
            </S.ProductInfo>
          </S.OrderItem>
          {adjustQuantity && (
            <S.VisibleInMobile>
              <S.Quantity
                quantity={orderQuantity}
                productID={data.id}
                decrementCount={decrementCount!}
                incrementCount={incrementCount!}
              />
              <S.Buttons
                theme="highlight"
                onClick={() => deleteCartItem(data.id)}
              >
                Remove
              </S.Buttons>
            </S.VisibleInMobile>
          )}
        </S.ProductInfoPreview>
      </ConditionalWrapper>
      <ReviewModal
        visible={IsReviewModalVisible}
        handleOkReviewModal={handleOkReviewModal}
        handleCancelReviewModal={handleCancelReviewModal}
      />
    </>
  );
};

export default ProductInfoPreview;
