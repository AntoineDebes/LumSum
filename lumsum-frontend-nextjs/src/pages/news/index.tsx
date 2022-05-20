import React, { Fragment } from "react";
import Head from "next/head";
import styles from "../../styles/news.module.scss";
import Footer from "src/layouts/Footer";

const News = () => {
  return (
    <Fragment>
      <Head>
        <title>News | Lumsum </title>
        <link rel="icon" href="/lumsum.png" type="image/png" />
      </Head>
      <div className={styles.container}>
        <div className={styles.inner}>
          <img
            src="/coming-soon.jpg"
            alt="coming-soon"
            style={{ width: "100%",maxHeight:500,objectFit:"contain" }}
          />
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default News;
