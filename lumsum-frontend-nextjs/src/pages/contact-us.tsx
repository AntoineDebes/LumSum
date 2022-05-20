import Head from 'next/head';
import { useRef } from 'react';
import { Formik, FormikProps } from 'formik';
import { Form, FormikDebug, FormItem, Input, SubmitButton } from 'formik-antd';
import { MailOutlined, UserOutlined, PhoneOutlined, FileOutlined, FileTextOutlined, SendOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import { Divider, message } from 'antd';
import Footer from '../layouts/Footer';
import CONTACT_US from '../graphql/contact-us.mutation';
import ContactUsValidationSchema from '../validations/contact-us.validation';
import BreadCrumb from '../components/BreadCrumb';
import styles from '../styles/contact-us.module.scss';


export default function Home() {
  const formRef = useRef<FormikProps<any>>(null);
  const [contactUs] = useMutation(CONTACT_US, {
    onCompleted: (data) => {
      message.success('Your message successfuly sent!');
      formRef.current.resetForm();
    },
    onError: (error) => {
      message.error(error.message);
      formRef.current.setSubmitting(false);
    }
  });
  const sendMessage = (values: any) => {
    contactUs({ variables: values });
  }
  return (
    <>
      <Head>
        <title>Contact Us | Lumsum  </title>
        <link rel="icon" href="/lumsum.png" type="image/png" />
        <link rel="canonical" href={`https://www.lumsum.io/contact-us`} />
      </Head>

      <main>
        <BreadCrumb title="Contact Us">
          <BreadCrumb.ItemLink href="/">Home</BreadCrumb.ItemLink>
          <BreadCrumb.Item>Contact Us</BreadCrumb.Item>
        </BreadCrumb>
        <div className="container">
          <div className="inner">
            <h1 className={styles.subTitle}>Send Message</h1>
            <h1 className={styles.title}>Contact Us</h1>
            <div className={styles.formContainer}>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  name: '',
                  email: '',
                  phone: '',
                  subject: '',
                  message: ''
                }}
                onSubmit={sendMessage}
                validationSchema={ContactUsValidationSchema}
                innerRef={formRef}
              >
                {() => (
                  <Form layout="vertical">
                    <div className={styles.flex}>
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
                    </div>
                    <div className={styles.flex}>
                      <FormItem name="phone">
                        <Input
                          name="phone"
                          prefix={<PhoneOutlined />}
                          placeholder="Your Phone"
                          size="large"
                        />
                      </FormItem>
                      <FormItem name="subject">
                        <Input
                          name="subject"
                          prefix={<FileOutlined />}
                          placeholder="Your Subject"
                          size="large"
                        />
                      </FormItem>
                    </div>
                    <FormItem name="message">
                      <Input.TextArea
                        name="message"
                        placeholder="Write your message here..."
                        size="large"
                        rows={4}
                      />
                    </FormItem>
                    <div className={styles.center}>
                      <SubmitButton size="large">Send Message<SendOutlined /></SubmitButton>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className={styles.content}>
              <aside className={styles.item}>
                <img src="/icons-02.png" alt="shovel" />
                <p>United Arab Emirates</p>
              </aside>
              <aside className={styles.item}>
                <img src="/icons-01.png" alt="organize & sort" />
                <p>Email: info@lumsum.io</p>
              </aside>
              <aside className={styles.item}>
                <img src="/icons-03.png" alt="Projector" />
                <p>+(971) - 056 5423746</p>
                <p>+(971) - 056 5427286</p>
              </aside>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
