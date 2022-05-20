import Link from "next/link";
import Image from "next/image";
import iconCart from "@/assets/images/shopping_cart.svg";
import * as S from "./NavCart.styled";

interface NavCartProps {
  cartItemCount: number;
}

const NavCart = ({ cartItemCount }: NavCartProps) => {
  return (
    <S.NavCart>
      <Link href="/cart">
        <S.NavIconMenu>
          <S.NavIconText>Cart</S.NavIconText>
          <S.NavIconWrap>
            <S.Badge>{cartItemCount}</S.Badge>
            <Image src={iconCart} alt="cart" layout="fill" />
          </S.NavIconWrap>
        </S.NavIconMenu>
      </Link>
    </S.NavCart>
  );
};

export default NavCart;
