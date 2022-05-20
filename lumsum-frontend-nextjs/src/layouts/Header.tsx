import React, { FC, useState } from "react";
import Link from "next/link";
import jwt_decode from "jwt-decode";
import {
  DashboardOutlined,
  DownOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Drawer, Dropdown, Menu } from "antd";
import { useRouter } from "next/router";
import TriBarMenu from "../assets/svg/bars-solid.svg";
import styles from "../styles/Header.module.scss";
import Search from "antd/lib/input/Search";
import clsx from "clsx";
import { useApolloClient } from "@apollo/react-hooks";

const Header: FC = () => {
  const router = useRouter();
  const apollo = useApolloClient();
  const [visible, setVisible] = useState<boolean>(false);
  const close = () => {
    setVisible(false);
  };
  const logout = () => {
    localStorage.removeItem("token");
    apollo.clearStore();
    router.replace("/");
    setVisible(false);
  };
  const onSearch = (value: string) => {
    router.push({
      pathname: "/search",
      search: `what_are_you_looking_for=${value}`,
    });
  };
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  let user: any = {};
  if (token) {
    user = jwt_decode(token);
  }

  const validateSearch = (event) => {
    const regex = new RegExp("^[a-zA-Z0-9\b]+$");
    const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link href="/dashboard">
          <div className={clsx(styles.button, styles.menuButton)}>
            <div className={styles.text}>
              <DashboardOutlined />
              &nbsp;&nbsp;Dashboard
            </div>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <div
          className={clsx(styles.button, styles.menuButton)}
          onClick={logout}
        >
          <div className={styles.text}>
            <LogoutOutlined />
            &nbsp;&nbsp;Logout
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );
  const isLoggedIn = Boolean(Object.keys(user).length);
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.brand}>
            <Link href="/">
              <img className={styles.brandImg} src="/lumsum.png" />
            </Link>
          </div>

          <ul className={styles.navMenu}>
            {router.pathname !== "/" && (
              <li>
                <Search
                  className={styles.search}
                  placeholder="Search Here"
                  enterButton
                  onSearch={onSearch}
                  onKeyPress={validateSearch}
                />
              </li>
            )}
            {/*{router.pathname !== '/competition' && (*/}
            {/*    <li>*/}
            {/*      <Link href="/competition">*/}
            {/*        <div className={styles.button}>*/}
            {/*          <div className={styles.text}>*/}
            {/*            Enter Competiton*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*      </Link>*/}
            {/*    </li>*/}
            {/*)}*/}
            {!isLoggedIn && (
              <li>
                <Link href="/login">
                  <div className={styles.button}>
                    <div className={styles.text}>
                      Login/Register <UserOutlined />
                    </div>
                  </div>
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <Dropdown overlay={menu} trigger={["click"]}>
                <li>
                  <div className={styles.button}>
                    <div className={styles.text}>
                      {user.email} <DownOutlined />
                    </div>
                  </div>
                </li>
              </Dropdown>
            )}
            <li>
              <Link href="/community">
                <div className={styles.button}>
                  <div className={styles.text}>
                    Community <ShoppingOutlined />
                  </div>
                </div>
              </Link>
            </li>
          </ul>
          <button
            onClick={() => setVisible(true)}
            className={styles.mobileTribarMenu}
          >
            <TriBarMenu />
          </button>
        </nav>
      </header>
      <Drawer
        placement="left"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        className={styles.mobileDrawer}
        drawerStyle={{
          backgroundColor: "var(--base-color)",
        }}
      >
        <nav className={styles.mobileMenuNav}>
          <ul>
            <li onClick={close}>
              <Link href="/">Home</Link>
            </li>
            {isLoggedIn && (
              <li onClick={close}>
                <Link href="/dashboard">Dashboard</Link>
              </li>
            )}
            <li onClick={close}>
              <Link href="/community">Community</Link>
            </li>
            <li onClick={close}>
              <Link href="/categories">Categories</Link>
            </li>
            <li onClick={close}>
              <Link href="/faq">FAQ</Link>
            </li>
            <li onClick={close}>
              <Link href="/contact-us">Contact Us</Link>
            </li>
            <li onClick={close}>
              <Link href="/about-us">About Us</Link>
            </li>
            {/*<li onClick={close}>*/}
            {/*  <Link href="/competition">Enter Competition</Link>*/}
            {/*</li>*/}

            {!isLoggedIn && (
              <>
                <li onClick={close}>
                  <Link href="/login">Login</Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li onClick={logout}>
                <Link href="/">Logout</Link>
              </li>
            )}
          </ul>
        </nav>
      </Drawer>
    </>
  );
};

export default Header;
