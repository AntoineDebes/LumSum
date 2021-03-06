import { useEffect, useState } from "react";

import AddressModal from "@/components/AddressModal/AddressModal";
import AuthMessage from "@/components/AuthMessage/AuthMessage";
import CardGrid2 from "@/components/CardGrid2/CardGrid2";
import Container from "@/components/Container/Container";
import ContainerMainContent from "@/components/ContainerMainContent/ContainerMainContent";
import ContainerMainFixedAside from "@/components/ContainerMainFixedAside/ContainerMainFixedAside";
import ContainerMainTitle from "@/components/ContainerMainTitle/ContainerMainTitle";
import Head from "next/head";
import InfoCard from "@/components/InfoCard/InfoCard";
import InfoCardAddress from "@/components/InfoCardAddress/InfoCardAddress";
import SidebarSecondary from "@/components/SidebarSecondary/SidebarSecondary";
import iconAddresses from "@/assets/images/addresses.svg";
import iconOrders from "@/assets/images/orders.svg";
import iconPayments from "@/assets/images/payments.svg";
import iconProfile from "@/assets/images/profile.svg";
import useAddressesStore from "@/store/useAddressesStore";
import useAuthStore from "@/store/useAuthStore";
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

interface addressType {
  id: string,
  name: string,
  mobileNumber: string,
  addressType: string,
  addressFromMap: string[],
  addressDetails: string,
  isDefault: boolean,
}

export const Addresses: any = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isAddressModalVisible, setisAddressModalVisible] = useState(false);
  const [editOrCreateModal, setEditOrCreateModal] = useState("");
  const [showMap, setShowMap] = useState(true);

  const addresses = useAddressesStore((state) => state.addresses);
  const deleteAddress = useAddressesStore(
    (state) => state.deleteAddress
  );

  const deleteLocation = (id: string) => {
    deleteAddress(id);
  };

  const setAsDefault = () => {
    console.log("");
  };

  const editAddress = (id: string) => {
    setisAddressModalVisible(true);
    setShowMap(false);
    setEditOrCreateModal("Edit");
  }

  const showModalEdit = () => {
    setisAddressModalVisible(true);
  };

  const handleAddressModalOk = () => {
    setisAddressModalVisible(false);
  };

  const handleAddressModalCancel = () => {
    setisAddressModalVisible(false);
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
        <title>Address Settings</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <SidebarSecondary
          menuList={menuList}
          selected="3"
          header={{ userName: "Mahmoud" }}
        />
        <ContainerMainFixedAside>
          <ContainerMainTitle>Addresses</ContainerMainTitle>
          <ContainerMainContent>
            <CardGrid2>
              {addresses.map((address: any) => {
                return (
                  <InfoCardAddress
                    isSelected={selectedAddress === address.id}
                    id={address.id}
                    onChange={(id: any) => setSelectedAddress(id)}
                    key={address.id}
                    data={address}
                    buttons={[
                      {
                        text: "Delete",
                        theme: "highlight",
                        onClickHandler: () => deleteLocation(address.id),
                      },
                      {
                        text: "Set as Default",
                        theme: "primary",
                        onClickHandler: setAsDefault,
                      },
                      {
                        text: "Edit",
                        theme: "",
                        onClickHandler: () => editAddress(address.id),
                      },
                    ]}
                  />
                );
              })}
              <InfoCard
                key="add new"
                addType
                text="+ Add a new address"
                onClick={() => {
                  setisAddressModalVisible(true);
                  setShowMap(true);
                  setEditOrCreateModal("Create");
                }}
              />
            </CardGrid2>
          </ContainerMainContent>
        </ContainerMainFixedAside>
      </Container>
      <AddressModal
        title={`${editOrCreateModal} Address`}
        isAddressModalVisible={isAddressModalVisible}
        handleAddressModalOk={handleAddressModalOk}
        handleAddressModalCancel={handleAddressModalCancel}
      />
    </>
  );
};