import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RatingOverview from "@/components/RatingOverview/RatingOverview";
import QuantityUpdater from "@/components/QuantityUpdater/QuantityUpdater";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import * as S from "./ProductOverview.styled";
import useCartItemsStore from "@/store/useCartItemsStore";
import { useRouter } from "next/router";

import iconCartWhite from "@/assets/images/shopping-cart.png";
import iconLock from "@/assets/images/lock.svg";
import iconSeller from "@/assets/images/seller.svg";
import iconMessage from "@/assets/images/message.svg";
import iconStopwatch from "@/assets/images/stopwatch.svg";
import useAuthStore from "@/store/useAuthStore";

interface IProps {
  addToCart: Function;
  updateQuantity: Function;
  data: {
    name: string;
    id: string;
    url: string;
    price: number;
    currency: string;
    image: { src: string }[];
    imageAlt: string;
    review: {
      rating: number;
      count: number;
    };
  };
}

const ProductOverview = ({ data, addToCart, updateQuantity }: IProps) => {
  const router = useRouter();
  // const { data: session } = useSession();
  const session = useAuthStore((state: { session: boolean; }) => state.session);

  const orderQuantity =
    useCartItemsStore(
      (state) =>
        state.cartItems.find(
          (cartItem: { id: string }) => cartItem.id === data.id
        )?.quantity
    ) || 1;

  const [quantity, setQuantity] = useState(orderQuantity);

  const decrementCount = (quantity: number) => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const incrementCount = (quantity: number) => {
    setQuantity(quantity + 1);
  };

  const cartItems = useCartItemsStore((state) => state.cartItems);

  return (
    <S.ProductOverview>
      <S.ImageBlock>
        <ImageGallery images={data.image} />
      </S.ImageBlock>
      <S.InfoBlock>
        <S.TitleWrap>
          <S.Title>{data.name}</S.Title>
          <RatingOverview size="large" rating={data.review} />
        </S.TitleWrap>
        <S.Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac
          justo egestas, convallis lacus pharetra, dignissim risus. Quisque
          luctus egestas posuere. Donec rutrum, turpis sit amet congue
          malesuada, mi enim ultrices dolor, eget consectetur augue massa in
          magna. Morbi gravida velit neque. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Vivamus ac justo egestas, convallis lacus
          pharetra, dignissim risus. Quisque luctus egestas posuere. Donec
          rutrum, turpis sit amet congue malesuada, mi enim ultrices.
        </S.Text>
        <S.ProductPrice price={data.price} />
        <QuantityUpdater
          productID={data.id}
          quantity={quantity}
          decrementCount={() => decrementCount(quantity)}
          incrementCount={() => incrementCount(quantity)}
        />
        {session ? (
          <S.ButtonAddToCart
            theme="primary"
            onClick={() => {
              cartItems.findIndex(({ id }: any) =>
                id === data.id
                  ? updateQuantity(data.id, quantity)
                  : addToCart({ ...data, quantity })
              );
            }}
          >
            Add to Cart&nbsp;
            <Image src={iconCartWhite.src} width="20" height="20" />
          </S.ButtonAddToCart>
        ) : (
          <Link href={`/user/login?redirectUrl=${router.asPath}`}>
            <S.ButtonAddToCartLink theme="primary">
              Add to Cart&nbsp;
              <Image src={iconCartWhite.src} width="20" height="20" />
            </S.ButtonAddToCartLink>
          </Link>
        )}
        <S.IconLinkWrap>
          <S.IconWrap>
            <Image src={iconLock} width="16" height="16" />
          </S.IconWrap>
          <Link href="/suppliers/supplier1/product1">
            <S.IconLinkLink>Secure transaction</S.IconLinkLink>
          </Link>
        </S.IconLinkWrap>
        <S.IconLinkWrap>
          <S.IconWrap>
            <S.IconLinkImage src={iconSeller} width="16" height="16" />
          </S.IconWrap>
          Sold by&nbsp;
          <Link href="/suppliers/supplier1/product1">
            <S.IconLinkLink>Black &amp; Deckter</S.IconLinkLink>
          </Link>
        </S.IconLinkWrap>
        <S.IconLinkWrap>
          <S.IconWrap>
            <S.IconLinkImage src={iconStopwatch} width="16" height="16" />
          </S.IconWrap>
          Delivery time: 3 Days
        </S.IconLinkWrap>
        <S.TextList>
          <S.TextListLi>
            A customized tool set specially designed for professional or
            technicians.
          </S.TextListLi>
          <S.TextListLi>
            A customized tool set specially designed for professional or
            technicians.
          </S.TextListLi>
          <S.TextListLi>
            A customized tool set specially designed for professional or
            technicians.
          </S.TextListLi>
          <S.TextListLi>
            A customized tool set specially designed for professional or
            technicians.
          </S.TextListLi>
        </S.TextList>
        <S.IconLinkWrap>
          <S.IconWrap>
            <Image src={iconMessage} width="16" height="16" />
          </S.IconWrap>
          <Link href="/suppliers/supplier1/product1">
            <S.IconLinkLink>
              Report incorrect or inappropriate product information.
            </S.IconLinkLink>
          </Link>
        </S.IconLinkWrap>
      </S.InfoBlock>
    </S.ProductOverview>
  );
};

export default ProductOverview;
