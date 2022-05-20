import { useQuery } from "@apollo/react-hooks";
import { Divider, Empty, Spin, Typography } from "antd";
import clsx from "clsx";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { useRouter } from "next/router";
import Footer from "../../layouts/Footer";
import styles from "../../styles/slug.module.scss";

const BLOG_BY_SLUG = gql`
  query blogBySlug($slug: String!) {
    blogBySlug(slug: $slug) {
      id
      slug
      title
      body
      cover
    }
  }
`;

export default function CategoryDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const { loading, error, data } = useQuery(BLOG_BY_SLUG, {
    variables: { slug },
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
        <title>{data?.blogBySlug?.title}</title>
        <link rel="canonical" href={`https://www.lumsum.io/blogs/${slug}`} />
        <meta content={data?.blogBySlug?.title} name="title" />
        <meta content={data?.blogBySlug?.body} name="description" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.lumsum.io/blogs/${slug}`}
        />
        <meta property="og:title" content={data?.blogBySlug?.title} />
        <meta property="og:description" content={data?.blogBySlug?.body} />
        <meta
          property="og:image"
          content={`${process.env.UPLOAD_URL}${data?.blogBySlug?.cover}`}
        />
        <meta property="twitter:type" content="website" />
        <meta
          property="twitter:url"
          content={`https://www.lumsum.io/blogs/${slug}`}
        />
        <meta property="twitter:title" content={data?.blogBySlug?.title} />
        <meta property="twitter:description" content={data?.blogBySlug?.body} />
        <meta
          property="twitter:image"
          content={`${process.env.UPLOAD_URL}${data.blogBySlug.cover}`}
        />
      </Head>

      <main>
        <div className="container">
          <div className="inner">
            <img
              className={styles.cover}
              src={
                data.blogBySlug.cover
                  ? `${process.env.UPLOAD_URL}${data.blogBySlug.cover}`
                  : "/no-cover.jpg"
              }
            />
            <Typography.Title>{data.blogBySlug.title}</Typography.Title>
            <div
                className={styles.description}
              dangerouslySetInnerHTML={{ __html: data.blogBySlug.body || "" }}
            />
            <div className={styles.share}>
              <h5>Share</h5>
              <div>
                <FacebookShareButton
                  url={`https://www.lumsum.io/blogs/${slug}`}
                  quote={data?.blogBySlug?.title}
                  className="Demo__some-network__share-button"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton
                  url={`https://www.lumsum.io/blogs/${slug}`}
                  title={data?.blogBySlug?.title}
                  className="Demo__some-network__share-button"
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <WhatsappShareButton
                  url={`https://www.lumsum.io/blogs/${slug}`}
                  title={data?.blogBySlug?.title}
                  separator=":: "
                  className="Demo__some-network__share-button"
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
