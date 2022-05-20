import React, { FC, Fragment, useRef } from "react";
import { useMutation } from "@apollo/client";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Formik, FormikProps } from "formik";
import { FormItem, Form, Input, SubmitButton, Checkbox } from "formik-antd";
import { useAuthContext } from "../context/AuthContext";
import * as AUTH from "../constants/auth";
import { LOGIN_AS_ADMIN } from "../graphql/mutation";
import { message } from "antd";
import { LOGIN_SCHEMA } from "../validation-schema";

const Login: FC = () => {
  const formRef = useRef<FormikProps<any>>(null);
  const history = useHistory();
  const { dispatch } = useAuthContext();
  const [loginAsAdmin] = useMutation(LOGIN_AS_ADMIN, {
    onCompleted: (data) => {
      message.success("Successfully LoggedIn. Redirecting...");
      formRef.current?.resetForm();
      localStorage.setItem("token", data.loginAsAdmin.accessToken);
      dispatch({ type: AUTH.LOGIN });
      history.replace("/dashboard");
    },
    onError: (error) => {
      message.error(error.message);
      formRef.current?.setSubmitting(false);
    },
    fetchPolicy: "no-cache",
  });

  const onSubmit = (values: any, _: any) => {
    loginAsAdmin({ variables: values });
  };

  return (
    <Fragment>
      <Helmet>
        <title>Lumsum | Login</title>
      </Helmet>
      <FormContainer>
        <ImageIconWrapper>
          <ImageIcon src="/lumsum.png" alt="lumsum" />
        </ImageIconWrapper>
        <Title>Admin Login</Title>
        <Formik
          enableReinitialize={true}
          innerRef={formRef}
          initialValues={{
            email: "",
            password: "",
            remember: false,
          }}
          onSubmit={onSubmit}
          validationSchema={LOGIN_SCHEMA}
        >
          {() => (
            <Form layout="vertical">
              <FormItem name="email" label="Email" required>
                <Input name="email" placeholder="Email" />
              </FormItem>
              <FormItem name="password" label="Password" required>
                <Input.Password name="password" placeholder="Password" />
              </FormItem>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {/* <Form.Item name="remember" valuePropName="checked">
                  <Checkbox name="remember">Remember me</Checkbox>
                </Form.Item> */}
                <SubmitButton>Login</SubmitButton>
              </div>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </Fragment>
  );
};

export default Login;

const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
`;
const ImageIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageIcon = styled.img`
  height: 100px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 32px;
`;
