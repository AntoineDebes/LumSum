import { gql, useMutation, useQuery } from "@apollo/client";
import { Button as AntdButton, Tooltip, Typography } from "antd";
import CKEditor from "ckeditor4-react";
import React, { FC, useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components/macro";

const GET_CATEGORY_TEXT = gql`
  {
    getCategoryText {
      type
      text
    }
  }
`;

const ADD_CATEGORY_TEXT = gql`
  mutation addCategoryText($text: String!) {
    addCategoryText(text: $text) {
      type
      text
    }
  }
`;

const CategoriesText: FC = () => {
  const [data, setData] = useState<any>("");
  const [readonly, setReadonly] = useState<boolean>(true);

  useQuery(GET_CATEGORY_TEXT, {
    onCompleted: (data) => {
      if (data?.getCategoryText) {
        setData(data?.getCategoryText?.text || "");
      }
    },
    onError: () => {
      setData("");
    },
  });

  const [addCategoryText] = useMutation(ADD_CATEGORY_TEXT, {
    onCompleted: (data) => {
      if (data?.addCategoryText) {
        setData(data?.addCategoryText?.text || "");
        setReadonly(true);
      }
    },
  });

  const handleSave = () => {
    addCategoryText({ variables: { text: data } });
  };

  return (
    <div>
      <Helmet>
        <title>Lumsum | Categories Text</title>
      </Helmet>
      <NewButtonWrapper>
        <Title level={3}>Category Text</Title>
        {readonly ? (
          <Tooltip placement="left" title="Click to edit">
            <Button
              onClick={() => setReadonly(false)}
              type="primary"
              shape="round"
              size="large"
              className="add-new"
            >
              Edit
            </Button>
          </Tooltip>
        ) : (
          <Tooltip placement="left" title="Click to save">
            <Button
              type="primary"
              shape="round"
              size="large"
              className="add-new"
              onClick={handleSave}
            >
              Save
            </Button>
          </Tooltip>
        )}
      </NewButtonWrapper>
      <CKEditor
        data={data}
        onChange={(e: any) => setData(e.editor.getData())}
        readOnly={readonly}
        placeholder="Write something..."
      />
    </div>
  );
};

export default CategoriesText;

const NewButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px auto;
`;

const Title = styled(Typography.Title)`
  margin: 0 !important;
`;

const Button = styled(AntdButton)`
  background-color: #049e94;
  border-color: #049e94;

  &.ant-btn-background-ghost {
    color: #049e94;
    border-color: #049e94;
  }
`;
