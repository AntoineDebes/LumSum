import React, { FC } from "react";
import Head from "next/head";
import gql from "graphql-tag";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { Card, Col, Row } from "antd";
// import { Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import styles from "../../styles/blogs.module.scss";
import Link from "next/link";
// import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Footer from "src/layouts/Footer";
// import jwt_decode from "jwt-decode";

const BLOGS = gql`
  query {
    blogs {
      id
      slug
      title
      body
      thumbnail
      cover
    }
  }
`;

const Blogs: FC = () => {
  const router = useRouter();
  const { loading, data } = useQuery(BLOGS, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <div>Loading..</div>;
  return (
    <>
      <Head>
        <title>Blogs | Lumsum </title>
        <link rel="icon" href="/lumsum.png" type="image/png" />
      </Head>

      <div className={styles.container}>
        <div className={styles.inner}>
            <Row gutter={[16, 16]}>
            {data?.blogs?.map((item: any, key: any) => (
              <BlogCard key={key} data={item} />
            ))}
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blogs;

const BlogCard = ({ data }) => {
  return (
      <Col md={8} sm={12} xs={24}>
        <Link href={`/blogs/${data.slug}`}>
            <Card
                hoverable
                className="blog_card"
                cover={
                    <img
                        className={styles.cover}
                        src={
                            data.cover
                                ? `${process.env.UPLOAD_URL}${data.thumbnail}`
                                : "/no-cover.jpg"
                        }
                        alt={data.title}
                    />
                }
            >
                <Meta title={data.title} style={{ textAlign: "center" }} />
                <p style={{ textAlign: "center", margin: 0 }}>
                    <a>Read More</a>
                </p>
            </Card>
        </Link>
      </Col>
  );
};

const BlogGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  padding: 0 10px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CardTitle = styled.h3`
  margin-top: 15px;
  margin-bottom: 0;
  line-height: 1.4;
  font-weight: 700;
  padding: 0 10px;
`;

const CardLink = styled.span`
  padding: 0 10px;
  border-bottom:10px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;
