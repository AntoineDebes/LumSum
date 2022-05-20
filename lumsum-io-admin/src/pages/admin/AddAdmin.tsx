import { ArrowLeftOutlined } from "@ant-design/icons";
import { gql, useMutation } from "@apollo/client";
import { Button, message, Typography } from "antd";
import { Formik } from "formik";
import { Form, FormItem, Input, SubmitButton } from "formik-antd";
import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Pasword is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const ADD_ADMIN = gql`
  mutation addAdmin($email: String!, $password: String!, $name: String!) {
    addAdmin(email: $email, password: $password, name: $name) {
      id
      name
      email
      access
      lastLoggedin
    }
  }
`;

const AddAdmin: FC<RouteComponentProps> = ({ history }) => {
  const [addAdmin] = useMutation(ADD_ADMIN);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      }}
      onSubmit={async (values, actions) => {
        try {
          await addAdmin({ variables: values });
          message.success("Admin added");
          actions.resetForm({
            values: {
              name: "",
              email: "",
              password: "",
              confirm_password: "",
            },
          });
          history.push("/admins");
        } catch (error: any) {
          // @ts-ignore
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
            <Title level={4}>Add Admin</Title>
            <SaveButton shape="round">Save</SaveButton>
          </Header>
          <Body>
            <FormItem name="name" label="Name" required>
              <Input name="name" placeholder="Name" />
            </FormItem>
            <FormItem name="email" label="Email" required>
              <Input name="email" placeholder="Email" />
            </FormItem>
            <FormItem name="password" label="Password" required>
              <Input type="password" name="password" placeholder="Password" />
            </FormItem>
            <FormItem name="confirm_password" label="Confirm Password" required>
              <Input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
              />
            </FormItem>
          </Body>
        </Form>
      )}
    </Formik>
  );
};

export default AddAdmin;

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

const Body = styled.div`
  width: 100%;
  padding: 8px 12px;
  margin-top: 15px;
`;

const SaveButton = styled(SubmitButton)`
  margin-left: auto;
`;

const BlogCoverContainer = styled.div<{ url: string | undefined }>`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  border-radius: 4px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  ${({ url }) =>
    url &&
    `
    background-image: url(${url});
  `}
`;

BlogCoverContainer.defaultProps = {
  url: undefined,
};
