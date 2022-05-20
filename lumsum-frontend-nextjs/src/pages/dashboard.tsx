import Head from "next/head";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { message, Space, Image, Button } from "antd";
import BreadCrumb from "../components/BreadCrumb";
import gql from "graphql-tag";
import ReviewsOfCustomer from "../containers/ReviewsOfCustomer";
import styles from "../styles/dashboard.module.scss";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import Footer from "../layouts/Footer";
import FavoriteSupplier from "../containers/FavoriteSupplier";

const ME = gql`
  query me {
    me {
      name
      email
      avatar
    }
  }
`;

const UPDATE_AVATAR = gql`
  mutation updateAvatar($avatar: Upload!) {
    updateAvatar(avatar: $avatar)
  }
`;

export default function Dashboard() {
  const router = useRouter();
  const [image, setImage] = useState<File>();
  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  });

  const [updateAvatar] = useMutation(UPDATE_AVATAR, {
    onCompleted: () => {
      setImage(undefined);
      message.success("Avatar successfully changes");
    },
    onError: (error) => {
      message.error(error.message);
    },
    refetchQueries: [{ query: ME }],
  });

  const handleChangeImage = (event: any) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const saveAvatar = (event: any) => {
    event.preventDefault();
    updateAvatar({
      variables: {
        avatar: image,
      },
    });
  };

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  let user: any = {};
  if (token) {
    user = jwt_decode(token);
  }
  const isLoggedIn = Boolean(Object.keys(user).length);

  let avatar = "https://lumsum-assets.s3.me-south-1.amazonaws.com/no-image-available.jpg";
  if (
    new RegExp("https://").test(data?.me?.avatar) ||
    new RegExp("http://").test(data?.me?.avatar)
  ) {
    avatar = data?.me?.avatar;
  } else if (data?.me?.avatar) {
    avatar = `${process.env.UPLOAD_URL}/${data?.me?.avatar}`;
  }

  return (
    <>
      <Head>
        <title>Lumsum | Dashboard</title>
        <link rel="icon" href="/lumsum.png" type="image/png" />
      </Head>
      <main>
        <BreadCrumb title="Dashboard">
          <BreadCrumb.ItemLink href="/">Home</BreadCrumb.ItemLink>
          <BreadCrumb.Item>Dashboard</BreadCrumb.Item>
        </BreadCrumb>
        <div className="container">
          <div className="inner">
            <div className={styles.flex}>
              <div className={styles.profileInfo}>
                <h1 className={styles.title}>Profile Info</h1>
                <Space>
                  <ul className={styles.info}>
                    <li>
                      <span>Name: </span>
                      {data?.me?.name}
                    </li>
                    <li>
                      <span>Email: </span>
                      {data?.me?.email}
                    </li>
                  </ul>
                </Space>
              </div>
              <div className={styles.profilePicture}>
                <h1 className={styles.title}>Avatar</h1>
                <Space>
                  <div className={styles.imgWrap}>
                    <img
                      src={
                        image
                          ? URL.createObjectURL(image)
                          : avatar || "/assets/no-image.png"
                      }
                    />
                    {image ? (
                      <Button onClick={saveAvatar} type="primary">
                        Save
                      </Button>
                    ) : (
                      <label htmlFor="change-profile-image">Change</label>
                    )}
                    {!image && (
                      <input
                        type="file"
                        accept="images/*"
                        className={styles.noDisplay}
                        id="change-profile-image"
                        name="change-profile-image"
                        onChange={handleChangeImage}
                      />
                    )}
                  </div>
                </Space>
              </div>
            </div>
            <FavoriteSupplier />
            <ReviewsOfCustomer />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
