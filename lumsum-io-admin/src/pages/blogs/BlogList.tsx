import { PlusOutlined } from "@ant-design/icons";
import { Button, Tooltip, Typography } from "antd";
import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components/macro";
import Blogs from "./Blogs";

const BlogList: FC<RouteComponentProps> = ({ history, match }) => {
  return (
    <div>
      <Helmet>
        <title>Lumsum | Blogs</title>
      </Helmet>
      <Header>
        <Title level={4}>All Blogs</Title>
        <Tooltip placement="left" title="Add New Blog">
          <Button
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            className="add-new"
            onClick={() => history.push(`${match.url}/add`)}
          >
            New
          </Button>
        </Tooltip>
      </Header>
      <Blogs />
    </div>
  );
};

export default BlogList;

const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 1px rgb(0 0 0 / 50%);
  padding: 8px 12px;
  border-radius: 4px;
`;

const Title = styled(Typography.Title)`
  margin: 0 !important;
`;
