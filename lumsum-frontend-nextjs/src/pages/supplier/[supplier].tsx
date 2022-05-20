import {Button, Divider, Empty, Rate, Spin, Tooltip, Typography} from "antd";
import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import gql from "graphql-tag";
import React, { SyntheticEvent, useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import AddReview from "../../containers/AddReview";
import Footer from "../../layouts/Footer";
import ReviewsOfSupplier from "../../containers/ReviewsOfSupplier";
import Facebook from "../../assets/svg/facebook.svg";
import Linkedin from "../../assets/svg/linkedin.svg";
import Location from "../../assets/svg/location.svg";
import Youtube from "../../assets/svg/instagram.svg";
import BreadCrumb from "../../components/BreadCrumb";
import styles from "../../styles/supplier-details.module.scss";
import SupplierImages from "../../components/SupplierImages";

const SUPPLIER = gql`
  query getSupplierData($supplierId: ID!) {
    supplier(id: $supplierId) {
      id
      tradeName
      logo
      city
      areaWithInCity
      contactPerson
      landlineNumber
      mobileNumber
      website
      about
      likes
      facebook
      linkdin
      youtube
      location
      avgRating
      user {
        email
      }
      products {
        id
        name
        icon
        category {
          id
        }
      }
      facebook
      linkdin
      youtube
      location
      images {
        id
        image
      }
    }
  }
`;
const formatLandlineNo = (no: string) => {
  try {
    return no.slice(0, 3) + " " + no.slice(3, 4) + " " + no.slice(4);
  } catch (error) {
    return "";
  }
};

const formatMobileNo = (no: string) => {
  try {
    return no.slice(0, 3) + " " + no.slice(3, 5) + " " + no.slice(5);
  } catch (error) {
    return "";
  }
};
const TOGGLE_FAVORITE = gql`
  mutation toggleFavoriteSupplier($supplierId: ID!) {
    toggleFavoriteSupplier(supplierId: $supplierId) {
      status
      supplier {
        id
      }
    }
  }
`;
const FAVORITE_SUPPLIER = gql`
  query {
    favoriteSupplier {
      id
    }
  }
`;

export default function ProductDetails({ fullUrl }) {
  const [showLandline, setShowLandline] = React.useState(false);
  const [showMobile, setShowMobile] = React.useState(false);

  const router = useRouter();
  const { supplier } = router.query;

  const { loading, error, data } = useQuery(SUPPLIER, {
    variables: {
      supplierId: supplier,
    },
    fetchPolicy: "cache-and-network",
  });

  const [favorites, setFavorites] = useState<Array<string>>([]);
  useQuery(FAVORITE_SUPPLIER, {
    onCompleted: (data) => {
      if (data?.favoriteSupplier) {
        setFavorites(data?.favoriteSupplier?.map((d: any) => d.id));
      }
    },
  });
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE);
  const loginToAddReview = () => {
    Swal.fire({
      text: "Login to add review",
      icon: "warning",
      showCancelButton: false,
      confirmButtonText: "Continue",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/login");
      }
    });
  };
  const handleFavorite = (event: SyntheticEvent, supplierId: string) => {
    event.preventDefault();
    toggleFavorite({
      variables: { supplierId },
      update: (_, { data: { toggleFavoriteSupplier } }) => {
        console.log({ toggleFavoriteSupplier });
        if (toggleFavoriteSupplier.status === "ADD") {
          setFavorites((prev) => [...prev, supplierId]);
        }
        if (toggleFavoriteSupplier.status === "REMOVE") {
          setFavorites((prev) => {
            const newPrev = [...prev];
            return newPrev.filter((d) => d !== supplierId);
          });
        }
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

  if (loading) return <Spin />;

  if (error)
    return (
      <Empty>
        Can't find what you want... <Link href="/contact-us">Contact Us</Link>
      </Empty>
    );
  const shareUrl = `https://www.lumsum.io/supplier/${supplier}`;
  const title = data?.supplier?.tradeName;

  return (
    <>
      <Head>
        <link rel="icon" href="/lumsum.png" type="image/png" />
        <title>{data.supplier.tradeName}</title>
        <link
          rel="canonical"
          href={`https://www.lumsum.io/supplier/${supplier}`}
        />
        <meta content={data.supplier.tradeName} name="title" />
        <meta content={data.supplier.tradeName} name="description" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.lumsum.io/supplier/${supplier}`}
        />
        <meta property="og:title" content={data.supplier.tradeName} />
        <meta property="og:description" content={data.supplier.tradeName} />
        <meta
          property="og:image"
          content={`${process.env.UPLOAD_URL}${data?.supplier?.logo}`}
        />
        <meta property="twitter:type" content="website" />
        <meta
          property="twitter:url"
          content={`https://www.lumsum.io/supplier/${supplier}`}
        />
        <meta property="twitter:title" content={data.supplier.tradeName} />
        <meta
          property="twitter:description"
          content={data.supplier.tradeName}
        />
        <meta
          property="twitter:image"
          content={`${process.env.UPLOAD_URL}${data?.supplier?.logo}`}
        />
      </Head>

      <main>
        <BreadCrumb title="Supplier">
          <BreadCrumb.ItemLink href="/">Home</BreadCrumb.ItemLink>
        </BreadCrumb>
        <div className="container">
          <div className={clsx("inner", styles.supplierDetails)}>
            <div className={styles.companyInfoWrap}>
              <div className={styles.companyNameWrap}>
                <h1 className={styles.companyName}>{data.supplier.tradeName}</h1>
                <ul className={styles.products}>
                  {data?.supplier?.products?.map((product: any, key: number) => (
                      <li key={key}>
                        <Link href={`/${product.category.id}/${product.id}`}>
                          <div className={styles.link}>{product.name}</div>
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.moreDetails}>
              <div className={styles.reviewDetails}>
                <h2 className={styles.title}>About Us</h2>
                <p className={styles.about}>{data.supplier.about}</p>
                {data?.supplier?.images?.length > 0 && (
                    <div>
                      <SupplierImages isLoggedIn={isLoggedIn} images={data.supplier.images} />
                    </div>
                )}
                <h2 className={clsx(styles.title, styles.subTitle)}>Average Review</h2>
                <div className={styles.ratingContainer}>
                  <div className={styles.ratingWraper}>
                    <Rate className="supplier-rating" value={data.supplier.avgRating} disabled />
                  </div>
                  <div className={styles.ratingValue}>{parseFloat(data.supplier.avgRating).toFixed(1)}</div>
                </div>
                <div className={styles.reviewContainer}>
                  {isLoggedIn ? (
                      <AddReview />
                  ) : (
                      <button className={styles.loginToAddReview} onClick={loginToAddReview}>
                        Add Review
                      </button>
                  )}
                  <div style={{ marginTop: 10 }} />
                  <ReviewsOfSupplier />
                </div>
              </div>

              <div className={styles.supplierSideBar}>
                <img
                    className={styles.supplierLogo}
                    src={`${process.env.UPLOAD_URL}${data?.supplier?.logo}`}
                    alt="no-logo"
                />


                <div className={styles.contactDetails}>
                  <h2 className={styles.title} style={{ paddingLeft: '1rem' }}>Contacts</h2>

                  <div className={styles.address}>
                    <p>
                      Address: {data.supplier.areaWithInCity}, {data.supplier.city}
                    </p>
                    {data.supplier.landlineNumber && (<p>
                      Phone:{" "}
                      <a href={`tel:+${data.supplier.landlineNumber}`}>
                        +{formatLandlineNo(data.supplier.landlineNumber).slice(0, showLandline ? 20 : 5)}
                        {!showLandline && <span className={styles.hiddenNumbers} onClick={() => setShowLandline(true)}>Click to view</span>
                        }
                      </a>
                    </p>)}
                    {data.supplier.mobileNumber && (<p>
                      Mobile:{" "}
                      <a href={`tel:+${data.supplier.mobileNumber}`}>
                        +{formatMobileNo(data.supplier.mobileNumber).slice(0, showMobile ? 20 : 5)}
                        {!showMobile && (<span className={styles.hiddenNumbers} onClick={() => setShowMobile(true)}>Click to view</span>)}
                      </a>
                    </p>)}
                    <p>
                      Email: <a href={`mailto:${data.supplier.user.email}`}>{data.supplier.user.email}</a>
                    </p>
                    <ul className={styles.socialIcons}>
                      {data?.supplier?.website && (
                          <li>
                            <a className={styles.facebook} href={data?.supplier?.website} target="_blank">
                              <img className={styles.www} src="/www.jpg" alt="www" />
                            </a>
                          </li>
                      )}
                      {data?.supplier?.facebook && (
                          <li>
                            <a className={styles.facebook} href={data.supplier.facebook} target="_blank">
                              <Facebook />
                            </a>
                          </li>
                      )}
                      {data.supplier.linkdin && (
                          <li>
                            <a className={styles.linkedin} href={data.supplier.linkdin} target="_blank">
                              <Linkedin />
                            </a>
                          </li>
                      )}
                      {data.supplier.youtube && (
                          <li>
                            <a className={styles.youtube} href={data.supplier.youtube} target="_blank">
                              <Youtube />
                            </a>
                          </li>
                      )}
                      {data.supplier.location && (
                          <li>
                            <a className={styles.location} href={data.supplier.location} target="_blank">
                              <Location />
                            </a>
                          </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className={styles.likeShareContainer}>
                  <div className={styles.favoriteWarp}>
                    <h5>Like</h5>
                    <div>
                      <Tooltip
                          placement="left"
                          title={favorites.includes(supplier as string) ? "Remove favorite" : "Add favorite"}
                      >
                        <Button
                            type="ghost"
                            shape="round"
                            icon={
                              favorites.includes(supplier as string) ? (
                                  <HeartFilled style={{ color: "var(--base-color)" }} />
                              ) : (
                                  <HeartOutlined />
                              )
                            }
                            size="large"
                            onClick={(e) => handleFavorite(e, supplier as string)}
                        >
                          <Typography.Text>{data.supplier.likes}</Typography.Text>
                        </Button>
                      </Tooltip>
                    </div>
                  </div>

                  <div>
                    <h5>Share</h5>
                    <div>
                      <FacebookShareButton url={shareUrl} quote={title} className="Demo__some-network__share-button">
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <TwitterShareButton url={shareUrl} title={title} className="Demo__some-network__share-button">
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      <WhatsappShareButton
                          url={shareUrl}
                          title={title}
                          separator=":: "
                          className="Demo__some-network__share-button"
                      >
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
