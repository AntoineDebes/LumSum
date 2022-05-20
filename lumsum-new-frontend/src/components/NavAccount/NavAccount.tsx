import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Menu, Dropdown } from "antd";
import { useRouter } from 'next/router'

import * as S from "./NavAccount.styled";
import Link from "next/link";
import { DownOutlined } from "@ant-design/icons";
import iconUser from "@/assets/images/user.svg";
import iconUserWhite from "@/assets/images/user-white.png";
import iconProfile from "@/assets/images/profile.svg";
import iconOrders from "@/assets/images/orders.svg";
import iconAddresses from "@/assets/images/addresses.svg";
import iconPayments from "@/assets/images/payments.svg";
import useAuthStore from "@/store/useAuthStore";

const NavAccount = ({ color }: { color?: string }) => {
  const router = useRouter();
  // const { data: session } = useSession();
  const session = useAuthStore((state) => state.session);
  const Logout = useAuthStore((state) => state.logout);

  const menuOptions = [
    {
      title: "Profile",
      url: "/account/profile",
      icon: iconProfile,
    },
    {
      title: "Orders",
      url: "/account/orders",
      icon: iconOrders,
    },
    {
      title: "Addresses",
      url: "/account/addresses",
      icon: iconAddresses,
    },
    {
      title: "Payments",
      icon: iconPayments,
      url: "/account/payments",
    },
  ];

  const menuList = (
    <Menu>
      {menuOptions.map((option, index) => {
        return (
          <Menu.Item key={index}>
            <Link href={option.url}>
              <S.SCAnchor>
                <Image src={option.icon} width="12" height="12" />
                {option.title}
              </S.SCAnchor>
            </Link>
          </Menu.Item>
        );
      })}
      <Menu.Item key="signOut">
        <Link href="/">
          <S.SCAnchor
            center
            onClick={e => {
              // e.preventDefault()
              Logout();
            }}
            title="Sign out">
            Sign out
          </S.SCAnchor>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <S.NavAccount>
      {session ? (
        <S.DropdownWrap>
          <S.DropdownLabel color={color}>Hello Mahmoud!</S.DropdownLabel>
          <Dropdown overlay={menuList}>
            <S.DropdownButton size="middle">
              <S.DropdownButtonText>My Account</S.DropdownButtonText>
              <S.NavIconWrap2>
                <Image
                  src={color === "white" ? iconUserWhite : iconUser}
                  alt="user"
                  layout="fill"
                />
              </S.NavIconWrap2>
              <DownOutlined />
            </S.DropdownButton>
          </Dropdown>
        </S.DropdownWrap>
      ) : (
        <Link href={`/user/login?redirectUrl=${router.asPath}`}>
          <S.SCAnchor>
            <S.NavIconMenu>
              <S.NavIconText>Sign In</S.NavIconText>
              <S.NavIconWrap>
                <Image
                  src={color === "white" ? iconUserWhite : iconUser}
                  alt="user"
                  layout="fill"
                />
              </S.NavIconWrap>
            </S.NavIconMenu>
          </S.SCAnchor>
        </Link>
      )}
    </S.NavAccount>
  );
};

export default NavAccount;
