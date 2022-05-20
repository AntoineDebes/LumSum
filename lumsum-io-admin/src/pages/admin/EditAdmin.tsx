import { ArrowLeftOutlined, CameraOutlined } from "@ant-design/icons";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, message, Typography } from "antd";
import CKEditor from "ckeditor4-react";
import { Formik } from "formik";
import { Form, FormikDebug, FormItem, Input, SubmitButton } from "formik-antd";
import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email is required"),
});

interface MatchParams {
  id: string | undefined;
}

const ADMIN = gql`
  query admin($id: ID!) {
    admin(id: $id) {
      id
      name
      email
    }
  }
`;

const UPDATE_ADMIN = gql`
  mutation updateAdmin($id: ID!, $email: String!, $name: String!) {
    updateAdmin(id: $id, email: $email, name: $name) {
      id
      name
      email
    }
  }
`;

const EditBlog: FC<RouteComponentProps<MatchParams>> = ({ match, history }) => {
  const id = match.params.id;
  const { loading, data } = useQuery(ADMIN, { variables: { id } });
  const [updateAdmin] = useMutation(UPDATE_ADMIN);

  if (loading) return <div>loading</div>;
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: data?.admin?.name || "",
        email: data?.admin?.email || "",
      }}
      onSubmit={async (values, actions) => {
        try {
          await updateAdmin({
            variables: { id, ...values },
          });
          message.success("Admin updated");
          actions.setSubmitting(false);
        } catch (error) {
          message.error(error.message);
        }
      }}
      validationSchema={validationSchema}
    >
      {() => (
        <Form layout="vertical">
          <Header>
            <Button
              type="primary"
              shape="round"
              icon={<ArrowLeftOutlined />}
              onClick={history.goBack}
            >
              Back
            </Button>
            <Title level={4}>Edit Admin</Title>
            <SaveButton shape="round">Save</SaveButton>
          </Header>
          <Body>
            <FormItem name="name" label="Name" required>
              <Input name="name" placeholder="Name" />
            </FormItem>
            <FormItem name="email" label="Email" required>
              <Input name="email" placeholder="Email" />
            </FormItem>
          </Body>
        </Form>
      )}
    </Formik>
  );
};

export default EditBlog;

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

const Body = styled.header`
  width: 100%;
  padding: 8px 12px;
  margin-top: 15px;
`;

const SaveButton = styled(SubmitButton)`
  margin-left: auto;
`;
