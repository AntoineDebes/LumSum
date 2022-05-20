import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Logo from "@/assets/images/logo.svg";
import Hamburger from "@/assets/images/menu.svg";
import { Layout } from "antd";
import useLayoutStore from "@/store/useSetSideBarStore";
import useCartItemsStore from "@/store/useCartItemsStore";
import LocationDropdown from "@/components/LocationDropdown/LocationDropdown";
import PrimarySearch from "@/components/PrimarySearch/PrimarySearch";
import NavAccount from "@/components/NavAccount/NavAccount";
import NavCart from "@/components/NavCart/NavCart";
import * as S from "./Header.styled";
import useAuthStore from "@/store/useAuthStore";

const { Header: AntDHeader } = Layout;

interface IProps {
  isMinimal?: boolean;
  title?: string;
}

const Header = ({ isMinimal, title }: IProps) => {
  // const { data: session } = useSession();
  const session = useAuthStore((state: { session: boolean; }) => state.session);

  const cartItemCount = useCartItemsStore((state) => state.cartItems.length);
  const displaySider = useLayoutStore((state) => state.showSider);

  return (
    <S.Header isMinimal={isMinimal}>
      <AntDHeader>
        {isMinimal ? (
          <>
            <S.leftBlock isMinimal>
              <Link href="/">
                <S.logo>
                  <S.logoImgWrap>
                    <Image src={Logo} alt="Logo" layout="fill" />
                  </S.logoImgWrap>
                </S.logo>
              </Link>
            </S.leftBlock>
            <S.centerBlock isMinimal>
              <S.title>{title}</S.title>
            </S.centerBlock>
          </>
        ) : (
          <>
            <S.leftBlock>
              <S.ToggleButton theme="plain" onClick={() => displaySider()}>
                <Image src={Hamburger} alt="menu" width="32" height="32" />
              </S.ToggleButton>
              <Link href="/">
                <S.logo>
                  <S.logoImgWrap>
                    <Image src={Logo} alt="Logo" layout="fill" />
                  </S.logoImgWrap>
                </S.logo>
              </Link>
              <LocationDropdown />
            </S.leftBlock>
            <S.centerBlock>
              <PrimarySearch />
            </S.centerBlock>
            <S.rightBlock>
              <NavAccount />
              {session && <NavCart cartItemCount={cartItemCount} />}
            </S.rightBlock>
          </>
        )}
      </AntDHeader>
    </S.Header>
  );
};

export default Header;
