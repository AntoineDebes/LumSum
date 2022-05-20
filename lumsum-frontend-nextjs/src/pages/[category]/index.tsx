import { useQuery } from "@apollo/react-hooks";
import { Divider, Empty, Spin, Typography } from "antd";
import clsx from "clsx";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import BreadCrumb from "../../components/BreadCrumb";
import Details from "../../containers/Details";
import Filter from "../../containers/Filter";
import Products from "../../containers/Products";
import CATEGORIY_DETAILS from "../../graphql/category-details.query";
import Footer from "../../layouts/Footer";
import styles from "../../styles/categories-details.module.scss";

const GET_CATEGORY_TEXT = gql`
  {
    getCategoryText {
      text
    }
  }
`;

export default function CategoryDetails() {
  const router = useRouter();
  const { category } = router.query;
  const { loading, error, data } = useQuery(CATEGORIY_DETAILS, {
    variables: { id: category },
    fetchPolicy: "cache-and-network",
  });
  // const { data: categoryText } = useQuery(GET_CATEGORY_TEXT);

  if (loading) return <Spin />;

  if (error)
    return (
      <Empty>
        Can't find what you want... <Link href="/contact-us">Contact Us</Link>
      </Empty>
    );
  return (
    <>
      <Head>
        <link rel="icon" href="/lumsum.png" type="image/png" />
        <title>{data?.category?.metaTitle}</title>
        <link rel="canonical" href={`https://www.lumsum.io/${category}`} />
        <meta content={data?.category?.metaTitle} name="title" />
        <meta content={data?.category?.metaDesc} name="description" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.lumsum.io/${category}`} />
        <meta property="og:title" content={data?.category?.metaTitle} />
        <meta property="og:description" content={data?.category?.metaDesc} />
        <meta
          property="og:image"
          content={`${process.env.UPLOAD_URL}${data?.category?.icon}`}
        />
        <meta property="twitter:type" content="website" />
        <meta
          property="twitter:url"
          content={`https://www.lumsum.io/${category}`}
        />
        <meta property="twitter:title" content={data?.category?.metaTitle} />
        <meta
          property="twitter:description"
          content={data?.category?.metaDesc}
        />
        <meta
          property="twitter:image"
          content={`${process.env.UPLOAD_URL}${data?.category?.icon}`}
        />
      </Head>

      <main>
        <BreadCrumb title="Category">
          <BreadCrumb.ItemLink href="/">Home</BreadCrumb.ItemLink>
          <BreadCrumb.Item>{data?.category?.name}</BreadCrumb.Item>
        </BreadCrumb>
        <div className={clsx("container", styles.allCategories)}>
          <div className={styles.filterContainer}>
            <h1 className={clsx("filter", styles.heading)}>Filter</h1>
            <Filter />
          </div>
          <div className={styles.dataContainer}>
            <Details
              name={data?.category?.name}
              desc={data?.category?.description}
              icon={data?.category?.icon}
              banner={data?.category?.banner}
              bannerMobile={data?.category?.bannerMobile}
              bannerActive={data?.category?.bannerActive}
              bannerUrl={data?.category?.bannerUrl}
            />
            <Typography.Title style={{ margin: "0 0 8px 0", fontSize: 30 }}>
              Products
            </Typography.Title>
            <Divider style={{ margin: 0 }} />
            <Products products={data?.category?.products} />
            <Divider />
            <div
              className={styles.categoryText}
              dangerouslySetInnerHTML={{
                __html: data?.category?.categoryText || "",
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
