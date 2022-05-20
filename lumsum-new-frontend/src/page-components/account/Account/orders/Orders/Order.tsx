import React from "react";
import Head from "next/head";
import Link from "next/link";
import { product, orderSummary } from "@/dummy-data/accounts";
import { useSession } from "next-auth/react"
import AuthMessage from "@/components/AuthMessage/AuthMessage";
import SidebarSecondary from "@/components/SidebarSecondary/SidebarSecondary";
import Progress from "@/components/Progress/Progress";
import ReviewModal from "@/components/ReviewModal/ReviewModal";
import Container from "@/components/Container/Container";
import ContainerMainContent from "@/components/ContainerMainContent/ContainerMainContent";
import ContainerMainFixedAside from "@/components/ContainerMainFixedAside/ContainerMainFixedAside";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { LeftOutlined } from "@ant-design/icons";
import * as S from "./Orders.styled";
import iconAddresses from "@/assets/images/addresses.svg";
import iconOrders from "@/assets/images/orders.svg";
import iconPayments from "@/assets/images/payments.svg";
import iconProfile from "@/assets/images/profile.svg";
import useAuthStore from "@/store/useAuthStore";

interface IProps { }

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

export const Order: React.FC<IProps> = () => {
  const [IsReviewModalVisible, setIsReviewModalVisible] = useState(false);

  const showReviewModal = () => {
    setIsReviewModalVisible(true);
  };

  const handleOkReviewModal = () => {
    setIsReviewModalVisible(false);
  };

  const handleCancelReviewModal = () => {
    setIsReviewModalVisible(false);
  };

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

  // const ref = React.createRef();

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
          <Link href="./">
            <S.GotoPreviousLink>
              <LeftOutlined />
              Back to Orders
            </S.GotoPreviousLink>
          </Link>
          <ContainerMainContent>
            <S.InfoHeader>
              <S.OrderTitle>Order {product.orderNumber}</S.OrderTitle>
              <S.OrderDate>Placed on {product.orderDate}</S.OrderDate>
            </S.InfoHeader>
            <Progress status="processing" />
            <S.Buttons theme="primaryGhost" onClick={showReviewModal}>
              Review Product
            </S.Buttons>
            <S.OrderCard>
              <S.InfoProductInfoPreview data={product} />
              <S.InfoBlock>
                <S.InfoTitleLevel1>Shipping Address</S.InfoTitleLevel1>
                <S.InfoText>{product.shippingAddress.name}</S.InfoText>
                <S.InfoText>
                  {product.shippingAddress.street}
                  {" - "}
                  {product.shippingAddress.city}
                </S.InfoText>
              </S.InfoBlock>
              <S.InfoBlock>
                <S.InfoTitleLevel1>Phone</S.InfoTitleLevel1>
                <S.InfoText>{product.phone}</S.InfoText>
              </S.InfoBlock>
              <S.InfoBlock>
                <S.InfoTitleLevel1>Payment Method</S.InfoTitleLevel1>
                <S.InfoTextCard>
                  <S.InfoTextCardIcon cardBrand="visa" />
                  Card ending in {product.card.cardNumber}
                </S.InfoTextCard>
              </S.InfoBlock>
            </S.OrderCard>
            <S.OrderCard>
              <S.InfoTitleLevel1>Order Summary</S.InfoTitleLevel1>
              <S.InfoBlock>
                <S.InfoTitleLevel2>Subtotal</S.InfoTitleLevel2>
                <S.InfoText>
                  {orderSummary.currency} {orderSummary.subtotal}
                </S.InfoText>
              </S.InfoBlock>
              <S.InfoBlock>
                <S.InfoTitleLevel2>Shipping Fee</S.InfoTitleLevel2>
                <S.InfoText>
                  {orderSummary.shippingFee === 0 ? (
                    <S.InfoTextFreeShipping>Free</S.InfoTextFreeShipping>
                  ) : (
                    orderSummary.shippingFee
                  )}
                </S.InfoText>
              </S.InfoBlock>
              <S.InfoBlock>
                <S.InfoTitleLevel2>
                  Total <S.FinePrint>(Inclusive of VAT)</S.FinePrint>
                </S.InfoTitleLevel2>
                <S.InfoText>
                  {orderSummary.currency} {orderSummary.total}
                </S.InfoText>
              </S.InfoBlock>
            </S.OrderCard>
          </ContainerMainContent>
        </ContainerMainFixedAside>
      </Container>
      <ReviewModal
        visible={IsReviewModalVisible}
        handleOkReviewModal={handleOkReviewModal}
        handleCancelReviewModal={handleCancelReviewModal}
      />
    </>
  );
};