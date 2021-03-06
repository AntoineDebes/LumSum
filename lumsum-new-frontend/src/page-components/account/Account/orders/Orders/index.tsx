import Head from "next/head";
import SidebarSecondary from "@/components/SidebarSecondary/SidebarSecondary";
import ProductInfoPreview from "@/components/ProductInfoPreview/ProductInfoPreview";
import Container from "@/components/Container/Container";
import ContainerMainFixedAside from "@/components/ContainerMainFixedAside/ContainerMainFixedAside";
import ContainerMainContent from "@/components/ContainerMainContent/ContainerMainContent";
import ContainerMainTitle from "@/components/ContainerMainTitle/ContainerMainTitle";
import { products } from "@/dummy-data/orders";
import * as S from "./Orders.styled";
import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { useRouter } from 'next/router';
import AuthMessage from "@/components/AuthMessage/AuthMessage";
import iconAddresses from "@/assets/images/addresses.svg";
import iconOrders from "@/assets/images/orders.svg";
import iconPayments from "@/assets/images/payments.svg";
import iconProfile from "@/assets/images/profile.svg";
import useAuthStore from "@/store/useAuthStore";

const menuList = [
  {
    title: "Profile",
    icon: iconProfile,
    url: "/account/profile",
    key: "1",
  },
  {
    title: "Orders",
    icon: iconOrders,
    url: "/account/orders",
    key: "2",
  },
  {
    title: "Addresses",
    icon: iconAddresses,
    url: "/account/addresses",
    key: "3",
  },
  {
    title: "Payments",
    icon: iconPayments,
    url: "/account/payments",
    key: "4",
  },
];

import { OrderStatusType } from "@/typings/types";

interface ProductProps {
  name: string;
  image: any;
  imageAlt: string;
  url: string;
  supplier: string;
  orderNumber: string;
  orderDate: string;
  orderStatus: OrderStatusType;
}

export const Orders: any = () => {
  let { data: session, status } = useSession();
  const sessionStore = useAuthStore((state) => state.session);
  status = sessionStore ? "authenticated" : "unauthenticated";

  const router = useRouter()

  useEffect(() => {
    if (!sessionStore) {
      router.push('/');
    }
  }, []);

  // if (status === "loading") {
  //   <AuthMessage>
  //     <p>Loading</p>
  //   </AuthMessage>
  // }

  if (status === "unauthenticated") {
    return (
      <AuthMessage>
        {/* <p>Access Denied</p> */}
      </AuthMessage>
    )
  }

  return (
    <>
      <Head>
        <title>Orders</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <SidebarSecondary
          menuList={menuList}
          selected="2"
          header={{ userName: "Mahmoud" }}
        />
        <ContainerMainFixedAside>
          <ContainerMainTitle>Orders</ContainerMainTitle>
          <ContainerMainContent>
            <ul>
              {products.map((product: ProductProps) => {
                return (
                  <S.List1li key={product.orderNumber}>
                    <ProductInfoPreview
                      data={product}
                      linked
                      cardLike
                      showHeader
                    />
                  </S.List1li>
                );
              })}
            </ul>
          </ContainerMainContent>
        </ContainerMainFixedAside>
      </Container>
    </>
  );
};
