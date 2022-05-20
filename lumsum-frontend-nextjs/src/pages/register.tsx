import clsx from 'clsx';
import Head from 'next/head';
import { useRef } from 'react';
import Link from 'next/link';
import { Formik, FormikProps } from 'formik';
import { Form, FormikDebug, FormItem, Input, SubmitButton } from 'formik-antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import { Divider, message } from 'antd';
import Footer from '../layouts/Footer';
import LoginOrRegisterWithSocial from '../containers/LoginOrRegisterWithSocial';
import RegisterSchema from '../validations/register.validation';
import LOGIN from '../graphql/login.mutation';
import REGISTER_AS_CUSTOMER from '../graphql/register-as-customer.mutation';
import styles from '../styles/register.module.scss';
import { useRouter } from 'next/router';



export default function Register() {
  const router = useRouter();
  const formRef = useRef<FormikProps<any>>(null);
  const [registerAsCustomer] = useMutation(REGISTER_AS_CUSTOMER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.registerAsCustomer.accessToken);
      message.success("Your account successfully created.")
      router.push("/dashboard");
      formRef.current.resetForm();
    },
    onError: (error) => {
      message.error(error.message);
      formRef.current.setSubmitting(false);
    }
  });

  const handleRegister = (values: any) => {
    registerAsCustomer({ variables: values });
  }

  return (
    <>
      <Head>
        <title>Lumsum | Register</title>
        <link rel="icon" href="/lumsum.png" type="image/png" />
      </Head>
      <main style={{ minHeight: "100%" }}>
        <div className={clsx("container", styles.background)}>
          <div className="inner">
            <div className={styles.card}>
              <h1 className={styles.title}>Welcome <span>to</span> Lumsum</h1>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: ''
                }}
                onSubmit={handleRegister}
                validationSchema={RegisterSchema}
                innerRef={formRef}
              >
                {() => (
                  <Form layout="vertical">
                    <FormItem name="name">
                      <Input
                        name="name"
                        prefix={<UserOutlined />}
                        placeholder="Full name"
                        size="large"
                      />
                    </FormItem>
                    <FormItem name="email">
                      <Input
                        name="email"
                        prefix={<MailOutlined />}
                        placeholder="Email"
                        size="large"
                      />
                    </FormItem>
                    <FormItem name="password">
                      <Input.Password
                        name="password"
                        prefix={<LockOutlined />}
                        placeholder="Password"
                        size="large"
                      />
                    </FormItem>
                    <FormItem name="confirmPassword">
                      <Input.Password
                        name="confirmPassword"
                        prefix={<LockOutlined />}
                        placeholder="Confirm Password"
                        size="large"
                      />
                    </FormItem>
                    <SubmitButton className="bg-hover" size="large" block>Register</SubmitButton>
                  </Form>
                )}
              </Formik>
              <Divider>Or Register With</Divider>
              <LoginOrRegisterWithSocial />
              <p className={styles.text}>Have an account ? <Link href="/login">Login</Link></p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
