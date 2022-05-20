import Head from "next/head";
import { Empty } from "antd";
import BreadCrumb from "../components/BreadCrumb";
import { useRouter } from "next/router";
import PRODUCT_SEARCH from "../graphql/product-search.query";
import styles from "../styles/search.module.scss";
import { useQuery } from "@apollo/react-hooks";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "../layouts/Footer";
import SearchFilter from "../containers/SearchFilter";
import clsx from "clsx";

export default function Dashboard() {
  const router = useRouter();
  const {
    what_are_you_looking_for = "",
    category = "",
    city = "",
  } = router.query;
  const { data, loading, error } = useQuery(PRODUCT_SEARCH, {
    variables: {
      whatAreYouLookingFor: what_are_you_looking_for,
      category,
      city,
    },
    fetchPolicy: "network-only",
  });
  return (
    <>
      <Head>
        <title>Lumsum | Search</title>
        <link rel="icon" href="/lumsum.png" type="image/png" />
      </Head>
      <main>
        <BreadCrumb title={`Search for ${what_are_you_looking_for}`}>
          <BreadCrumb.ItemLink href="/">Home</BreadCrumb.ItemLink>
          <BreadCrumb.Item>{what_are_you_looking_for}</BreadCrumb.Item>
        </BreadCrumb>
        <div className={clsx("container", styles.searchContainer)}>
          <div className={styles.filterContainer}>
            <h1 className={clsx("filter", styles.heading)}>Filter</h1>
            <SearchFilter what_are_you_looking_for={what_are_you_looking_for} />
          </div>
          <div className={styles.dataContainer}>
            <div className={styles.grid}>
              {data?.productSearch?.map((product) => (
                <Link
                  href={{
                    pathname: `/${product.category.id}/${product.id}`,
                    search: `city=${city}`,
                  }}
                >
                  <div className={styles.card}>
                    <div className={styles.imgWrap}>
                      <img
                        src={`${process.env.UPLOAD_URL}${product.icon}`}
                        alt={product.name}
                        // layout="responsive"
                        height={150}
                        width={150}
                      />
                    </div>
                    <p className={styles.name}>{product.name}</p>
                  </div>
                </Link>
              ))}
            </div>
            {!data?.productSearch?.length && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              >
                Can't find what you want...{" "}
                <Link href="/contact-us">Contact Us</Link>
              </Empty>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
