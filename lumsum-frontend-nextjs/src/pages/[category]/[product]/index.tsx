import { Divider, Empty, Spin, Typography } from "antd";
import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import Image from "next/image";
import BreadCrumb from "../../../components/BreadCrumb";
import Footer from "../../../layouts/Footer";
import Filter from "../../../containers/SupplierFilter";
import Suppliers from "../../../containers/Suppliers";
import Details from "../../../containers/Details";
import PRODUCT from "../../../graphql/product.query";
import styles from "../../../styles/categories-details.module.scss";

export default function ProductDetails() {
  const router = useRouter();
  const { category, product } = router.query;
  const { loading, error, data } = useQuery(PRODUCT, {
    variables: { id: product },
    fetchPolicy: "cache-and-network",
  });

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
        <title>{data?.product?.metaTitle}</title>
        <link
          rel="canonical"
          href={`https://www.lumsum.io/${category}/${product}`}
        />
        <meta content={data?.product?.metaTitle} name="title" />
        <meta content={data?.product?.metaDesc} name="description" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.lumsum.io/${category}/${product}`}
        />
        <meta property="og:title" content={data?.product?.metaTitle} />
        <meta property="og:description" content={data?.product?.metaDesc} />
        <meta
          property="og:image"
          content={`${process.env.UPLOAD_URL}${data?.product?.icon}`}
        />
        <meta property="twitter:type" content="website" />
        <meta
          property="twitter:url"
          content={`https://www.lumsum.io/${category}/${product}`}
        />
        <meta property="twitter:title" content={data?.product?.metaTitle} />
        <meta
          property="twitter:description"
          content={data?.product?.metaDesc}
        />
        <meta
          property="twitter:image"
          content={`${process.env.UPLOAD_URL}${data?.product?.icon}`}
        />
      </Head>

      <main>
        <BreadCrumb title="Category">
          <BreadCrumb.ItemLink href="/">Home</BreadCrumb.ItemLink>
          <BreadCrumb.ItemLink href={`/${category}`}>
            {data?.product?.category?.name || ""}
          </BreadCrumb.ItemLink>
          <BreadCrumb.Item>{data?.product?.name || ""}</BreadCrumb.Item>
        </BreadCrumb>
        <div className={clsx("container", styles.allCategories)}>
          <div className={styles.filterContainer}>
            <h1 className={clsx("filter", styles.heading)}>Filter</h1>
            <Filter />
          </div>
          <div className={styles.dataContainer}>
            <Details
              name={data?.product?.name}
              desc={data?.product?.description}
              icon={data?.product?.icon}
            />
            <Typography.Title style={{ margin: "0 0 8px 0", fontSize: 30 }}>
              Suppliers
            </Typography.Title>
            <Divider style={{ margin: 0 }} />
            <Suppliers />
            <Divider />
            <div
                className={styles.categoryText}
                dangerouslySetInnerHTML={{
                  __html: data?.product?.productText || "",
                }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
