import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import { gql, useQuery } from "@apollo/client";
import { Button, Typography } from "antd";
import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

interface MatchParams {
  id: string | undefined;
}

const BLOG = gql`
  query blog($id: ID!) {
    blog(id: $id) {
      id
      slug
      title
      body
      cover
    }
  }
`;

const BlogDetails: FC<RouteComponentProps<MatchParams>> = ({
  match,
  history,
}) => {
  const id = match.params.id;
  const { loading, data } = useQuery(BLOG, { variables: { id } });
  if (loading) return <div>loading</div>;
  return (
    <div>
      <Header>
        <Button
          type="primary"
          shape="round"
          icon={<ArrowLeftOutlined />}
          onClick={history.goBack}
        >
          Back
        </Button>
        <Title level={4}>Blog Details</Title>
        <Button
          type="primary"
          shape="round"
          icon={<EditOutlined />}
          onClick={() => history.push(`/blogs/${id}/edit`)}
          style={{ marginLeft: "auto" }}
        >
          Edit
        </Button>
      </Header>
      <Body>
        <CoverImage
          src={
            data.blog.cover
              ? `${process.env.REACT_APP_IMAGE_URL}${data.blog.cover}`
              : undefined
          }
        />
        <BlogTitle>{data.blog.title}</BlogTitle>
        <BlogBody dangerouslySetInnerHTML={{ __html: data.blog.body || "" }} />
      </Body>
    </div>
  );
};

export default BlogDetails;

const Cover = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  max-height: 240px;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0 0 1px rgb(0 0 0 / 50%);
  padding: 8px 12px;
  border-radius: 4px;
`;

const Title = styled(Typography.Title)`
  margin-bottom: 0 !important;
  margin-left: 8px;
  border-left: 2px solid rgba(0, 0, 0, 0.3);
  padding-left: 8px;
  color: rgba(0, 0, 0, 0.65);
`;

const BlogTitle = styled(Typography.Title)`
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 0;
  padding: 8px 12px;
`;

const BlogBody = styled.div`
  padding: 8px 12px;
`;

const Body = styled.div`
  width: 100%;
  max-width: 780px;
  margin: 15px auto;
  background-color: #ffffff;
`;

const CoverImage = styled.img.attrs((props) => ({
  alt: "cover",
  src: props.src,
}))`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 240px;
`;

CoverImage.defaultProps = {
  src: "/no-cover.jpg",
};
