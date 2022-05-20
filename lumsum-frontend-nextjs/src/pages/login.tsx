import clsx from 'clsx';
import Head from 'next/head';
import { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Formik, FormikProps } from 'formik';
import { Form, FormikDebug, FormItem, Input, SubmitButton } from 'formik-antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import { Divider, message } from 'antd';
import LoginOrRegisterWithSocial from '../containers/LoginOrRegisterWithSocial';
import LoginSchema from '../validations/login.validation';
import LOGIN from '../graphql/login.mutation';
import styles from '../styles/login.module.scss';
import Footer from '../layouts/Footer';


export default function Login() {
  const router = useRouter();
  const formRef = useRef<FormikProps<any>>(null);

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.accessToken);
      router.push("/dashboard");
      message.success("Login successfull")
      formRef.current.resetForm();
      formRef.current.setSubmitting(false);
    },
    onError: (error) => {
      formRef.current.setSubmitting(false);
      message.error(error.message);
      formRef.current.setSubmitting(false);
    }
  });

  const handleLogin = (values: any) => {
    login({ variables: values });
  }

  return (
    <>
      <Head>
        <title>Lumsum | Login</title>
        <link rel="icon" href="/lumsum.png" type="image/png" />
      </Head>
      <main style={{ minHeight: "100%" }}>
        <div className={clsx("container", styles.background)}>
          <div className="inner">
            <div className={styles.card}>
              <h1 className={styles.title}>Login <span>to Lumsum</span></h1>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  email: "",
                  password: ""
                }}
                onSubmit={handleLogin}
                validationSchema={LoginSchema}
                innerRef={formRef}
              >
                {() => (
                  <Form layout="vertical">
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
                    <SubmitButton className="bg-hover" size="large" block>Login</SubmitButton>
                  </Form>
                )}
              </Formik>
              <Divider>Or Login With</Divider>
              <LoginOrRegisterWithSocial />
              <p className={styles.text}>Don't have an account ? <Link href="/register">Register</Link></p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
