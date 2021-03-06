import Head from "next/head";
import Link from "next/link";
import Layout from "@/layout/Layout";
import { ReactChild } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthenticationBox from "@/components/AuthenticationBox/AuthenticationBox";
import Container from "@/components/Container/Container";
import Form from "@/components/Form/Form";
import FormGroup from "@/components/FormGroup/FormGroup";
import ButtonWrap from "@/components/ButtonWrap/ButtonWrap";
import Button from "@/components/Button/Button";
import * as S from "./Login.styled";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

interface IProps { }

export const Login: any = () => {
  return (
    <>
      <Head>
        <title>Lumsum Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <AuthenticationBox
          altOptionText="Not a member"
          altOptionLink="/user/register"
          altOptionLinkText="Create Account"
        >
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              console.log("");
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <FormGroup
                  label="Email"
                  id="email"
                  placeholder="abc@domain.com"
                  requiredField
                  errors={errors}
                  touched={touched}
                />
                <FormGroup
                  label="Password"
                  id="password"
                  placeholder="********"
                  requiredField
                  errors={errors}
                  touched={touched}
                />
                <ButtonWrap marginTop="0">
                  <Button theme="primary" size="medium" fullWidth type="submit">
                    Log in
                  </Button>
                </ButtonWrap>
              </Form>
            )}
          </Formik>
          <Link href="/user/forgot-password">
            <S.LoginLink>Forgot password?</S.LoginLink>
          </Link>
        </AuthenticationBox>
      </Container>
    </>
  );
};


Login.getLayout = function PageLayout(page: ReactChild) {
  return (
    <Layout isMinimal title="Login">
      {page}
    </Layout>
  )
}