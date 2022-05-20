
import Head from "next/head";
import Link from "next/link";
import Footer from "../layouts/Footer";
import { Fragment } from "react";
// import Blogs from "../containers/Blogs";
import Blog from "../assets/svg/blog.svg";
import News from "../assets/svg/news.svg";
import Forum from "../assets/svg/forum.svg";
import styles from "../styles/community.module.scss";

export default function Community() {
  return (
    <Fragment>
      <Head>
        <title>Community | Lumsum </title>
        <link rel="icon" href="/lumsum.png" type="image/png" />
      </Head>
      <div className={styles.container}>
        <div className={styles.inner}>
          <h1 className={styles.title}>Community</h1>
          <div className={styles.imgContainer}>
            <img className={styles.img} src="/community.jpg" alt="community" />
          </div>
        </div>
      </div>
      <div className="inner">
        <div className={styles.flexContainer}>
          <Link href="/blogs">
            <div className={styles.item}>
              <div>
                <Blog />
              </div>
              <div>
                <h3>Blog</h3>
              </div>
            </div>
          </Link>
          <Link href="/news">
            <div className={styles.item}>
              <div>
                <News />
              </div>
              <div>
                <h3>News</h3>
              </div>
            </div>
          </Link>
          <Link href="/forum">
            <div className={styles.item}>
              <div>
                <Forum />
              </div>
              <div>
                <h3>Forum</h3>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
