import Head from "next/head";
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
import * as S from "./Register.styled";
import Link from "next/link";

interface RegistrationValues {
  email: string;
  password: string;
}

const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  organization: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  userType: Yup.boolean().required("Required"),
});

const optionsUserType = [
  { label: "Individual", value: "individual" },
  { label: "Contractor", value: "contractor" },
  { label: "Supplier", value: "suppluer" },
];

interface IProps { }
export const Register: any = () => {
  return (
    <>
      <Head>
        <title>Lumsum Registration</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <AuthenticationBox
          altOptionText="Already have an account?"
          altOptionLink="/user/login"
          altOptionLinkText="Log in"
        >
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              organization: "",
              email: "",
              password: "",
              confirmPassword: "",
              userType: "",
            }}
            validationSchema={RegistrationSchema}
            onSubmit={(values) => {
              console.log("");
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <FormGroup
                  label="First Name"
                  id="firstName"
                  placeholder="John"
                  requiredField
                  errors={errors}
                  touched={touched}
                />
                <FormGroup
                  label="Last Name"
                  id="lastName"
                  placeholder="Smith"
                  requiredField
                  errors={errors}
                  touched={touched}
                />
                <FormGroup
                  label="Organization"
                  id="organization"
                  placeholder="ACE"
                  requiredField
                  errors={errors}
                  touched={touched}
                />
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
                <FormGroup
                  label="Confirm Password"
                  id="confirmPassword"
                  placeholder="********"
                  requiredField
                  errors={errors}
                  touched={touched}
                />
                <FormGroup
                  label="I'm a"
                  id="userType"
                  requiredField
                  noInput
                  errors={errors}
                  touched={touched}
                >
                  <S.Radio options={optionsUserType} optionType="button" />
                </FormGroup>
                <S.Disclaimer>
                  <S.DisclaimerText>
                    By clicking on Sign up, you agree to Lumsum's&nbsp;
                    <Link href="">
                      <S.DisclaimerLink>
                        Terms and Conditions of Use
                      </S.DisclaimerLink>
                    </Link>
                    .
                  </S.DisclaimerText>
                  <S.DisclaimerText>
                    To learn more about how lumsum collects, uses, shares and
                    protects your personal data, please read lumsum's&nbsp;
                    <Link href="">
                      <S.DisclaimerLink>Privacy Policy</S.DisclaimerLink>
                    </Link>
                    .
                  </S.DisclaimerText>
                </S.Disclaimer>
                <ButtonWrap marginTop="0">
                  <Button theme="primary" size="medium" fullWidth type="submit">
                    Sign up
                  </Button>
                </ButtonWrap>
              </Form>
            )}
          </Formik>
        </AuthenticationBox>
      </Container>
    </>
  );
};

Register.getLayout = function PageLayout(page: ReactChild) {
  return (
    <Layout isMinimal title="Create your free account">
      {page}
    </Layout>
  )
}