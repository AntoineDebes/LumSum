import React, { FC } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import styles from "../styles/blogs.module.scss";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

const BLOGS = gql`
  query {
    blogs {
      id
      slug
      title
      body
      cover
    }
  }
`;

const Blogs: FC = () => {
  const router = useRouter();
  const { loading, data } = useQuery(BLOGS, {
    fetchPolicy: "cache-and-network",
  });
  const checkisLoggedIn = (e) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    let user: any = {};
    if (token) {
      user = jwt_decode(token);
    }
    const isLoggedIn = Boolean(Object.keys(user).length);

    if (!isLoggedIn) {
      e.preventDefault();
      Swal.fire({
        text: "Login to read blog",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "Continue",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    }
  };
  if (loading) return <div>Loading..</div>;
  return (
    <div style={{ margin: "15px auto" }}>
      <Row gutter={[16, 16]}>
        {data.blogs.map((d: any, k: number) => (
          <Col md={8} sm={12} xs={24} key={k}>
            <Link href={`/blogs/${d.slug}`}>
              <Card
                hoverable
                onClick={checkisLoggedIn}
                className="blog_card"
                cover={
                  <img
                    className={styles.cover}
                    src={
                      d.cover
                        ? `${process.env.UPLOAD_URL}${d.cover}`
                        : "/no-cover.jpg"
                    }
                  />
                }
              >
                <Meta title={d.title} style={{ textAlign: "center" }} />
                <p style={{ textAlign: "center", margin: 0 }}>
                  <a>Read More</a>
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Blogs;
