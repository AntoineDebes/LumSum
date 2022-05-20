import * as Yup from "yup";

import { useEffect, useState } from "react";

import AuthMessage from "@/components/AuthMessage/AuthMessage";
import CardGrid2 from "@/components/CardGrid2/CardGrid2";
import Container from "@/components/Container/Container";
import ContainerMainContent from "@/components/ContainerMainContent/ContainerMainContent";
import ContainerMainFixedAside from "@/components/ContainerMainFixedAside/ContainerMainFixedAside";
import ContainerMainTitle from "@/components/ContainerMainTitle/ContainerMainTitle";
import Head from "next/head";
import InfoCard from "@/components/InfoCard/InfoCard";
import InfoCardPayment from "@/components/InfoCardPayment/InfoCardPayment";
import PaymentModal from "@/components/PaymentModal/PaymentModal";
import SidebarSecondary from "@/components/SidebarSecondary/SidebarSecondary";
import iconAddresses from "@/assets/images/addresses.svg";
import iconMasterCard from "@/assets/images/payment-options/mastercard.svg";
import iconOrders from "@/assets/images/orders.svg";
import iconPayments from "@/assets/images/payments.svg";
import iconProfile from "@/assets/images/profile.svg";
import useAuthStore from "@/store/useAuthStore";
import usePaymentCardsStore from "@/store/usePaymentCardsStore";
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react"

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

interface CardFormValues {
  cardholderName: string;
  cardNumber: number;
  cardExpiry: number;
  cardCVV: number;
}

const CardSchema = Yup.object().shape({
  cardholderName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  cardNumber: Yup.number().required("Card number is required"),
  cardExpiry: Yup.string().required("Card expiry is required"),
  cardCVV: Yup.number().required("CVV is required"),
});

export const Payments: any = () => {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);

  const showPaymentModal = () => {
    setIsPaymentModalVisible(true);
  };

  const handleOkPaymentModal = () => {
    setIsPaymentModalVisible(false);
  };

  const handleCancelPaymentModal = () => {
    setIsPaymentModalVisible(false);
  };

  const setAsDefault = () => {
    console.log("");
  };

  const paymentCards = usePaymentCardsStore((state) => state.paymentCards);
  const addPaymentCard = usePaymentCardsStore((state) => state.addPaymentCard);
  const deletePaymentCard = usePaymentCardsStore(
    (state) => state.deletePaymentCard
  );

  const deletePayment = (id: string) => {
    deletePaymentCard(id);
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

  return (
    <>
      <Head>
        <title>Payments Settings</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <SidebarSecondary
          menuList={menuList}
          selected="4"
          header={{ userName: "Mahmoud" }}
        />
        <ContainerMainFixedAside>
          <ContainerMainTitle>Payments</ContainerMainTitle>
          <ContainerMainContent>
            <CardGrid2>
              {paymentCards.map((paymentOption: any) => {
                return (
                  <InfoCardPayment
                    key={paymentOption.id}
                    icon={iconMasterCard}
                    isSelected={selectedPaymentOption === paymentOption.id}
                    id={paymentOption.id}
                    onChange={(id: any) => setSelectedPaymentOption(id)}
                    data={paymentOption}
                    buttons={[
                      {
                        text: "Delete",
                        theme: "highlight",
                        onClickHandler: () => deletePayment(paymentOption.id),
                      },
                      {
                        text: "Set as Default",
                        theme: "primary",
                        onClickHandler: setAsDefault,
                      },
                    ]}
                  />
                );
              })}
              <InfoCard
                key="add new"
                addType
                text="+ Add a new card"
                onClick={() => showPaymentModal()}
              />
            </CardGrid2>
          </ContainerMainContent>
        </ContainerMainFixedAside>
      </Container>
      <PaymentModal
        title="Add Card"
        visible={isPaymentModalVisible}
        handleOkPaymentModal={handleOkPaymentModal}
        handleCancelPaymentModal={handleCancelPaymentModal}
      />
    </>
  );
};