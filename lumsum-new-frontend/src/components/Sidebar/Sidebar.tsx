import { MenuInfo } from "rc-menu/lib/interface";
import Link from "next/link";
import Image from "next/image";
import { Layout, Menu } from "antd";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router'
import Button from "@/components/Button/Button";
import iconClose from "@/assets/images/close.svg";
import NavAccount from "@/components/NavAccount/NavAccount";
import useLayoutStore from "@/store/useSetSideBarStore";
import * as S from "./Sidebar.styled";
import useAuthStore from "@/store/useAuthStore";

const { Sider } = Layout;

const Sidebar = () => {
  const router = useRouter();
  // const { data: session } = useSession();
  const session = useAuthStore((state) => state.session);
  const Logout = useAuthStore((state) => state.logout);
  const RemoveSider = useLayoutStore((state) => state.hideSider);
  const { SubMenu } = Menu;

  function handleMenuClick(e: MenuInfo) {
    console.log("", e);
  }

  return (
    <S.Sidebar>
      <S.Overlay
        collapsed={useLayoutStore((state) => state.isSiderHidden)}
        onClick={() => RemoveSider()}
      />
      <Sider
        theme="light"
        trigger={null}
        width="240"
        collapsible
        collapsed={useLayoutStore((state) => state.isSiderHidden)}
        collapsedWidth="0"
      >
        <S.SidebarHead>
          <NavAccount color="white" />
          <Button theme="plain" onClick={() => RemoveSider()}>
            <Image src={iconClose} alt="menu" width="16" height="16" />
          </Button>
        </S.SidebarHead>
        <S.SidebarBody>
          <S.SidebarTitle>Browse by Category</S.SidebarTitle>
          <Menu onClick={handleMenuClick} mode="vertical">
            <SubMenu key="sub1" title="Navigation One">
              <Menu.ItemGroup title="Item 1">
                <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Item 2">
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <SubMenu key="sub2" title="Navigation Two">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub4" title="Navigation Three">
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </Menu>
        </S.SidebarBody>
        <S.SidebarFooter>
          <S.SidebarTitle>Help &amp; Settings</S.SidebarTitle>
          <S.SidebarLinkList>
            {session ? (
              <>
                <S.SidebarLinkListLi>
                  <Link href="/account/profile">
                    <S.SidebarLinks>Your Account</S.SidebarLinks>
                  </Link>
                </S.SidebarLinkListLi>
                <S.SidebarLinkListLi>
                  <Link href="/">
                    <S.SidebarLinks
                      onClick={e => {
                        // e.preventDefault()
                        signOut()
                      }}
                    >
                      Sign Out
                    </S.SidebarLinks>
                  </Link>
                </S.SidebarLinkListLi>
              </>
            ) : (
              <S.SidebarLinkListLi>
                <Link href={`/user/login?redirectUrl=${router.asPath}`}>
                  <S.SidebarLinks>Sign In</S.SidebarLinks>
                </Link>
              </S.SidebarLinkListLi>
            )
            }
          </S.SidebarLinkList>
        </S.SidebarFooter>
      </Sider>
    </S.Sidebar>
  );
};

export default Sidebar;
