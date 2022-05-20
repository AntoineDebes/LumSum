import React from 'react';
import { message } from 'antd';
import * as Yup from 'yup';
import { Formik } from "formik";
import { Input, Form, FormItem, SubmitButton } from "formik-antd";
import { useMutation } from '@apollo/react-hooks';
import SUBSCRIBE from '../graphql/email-subscribe.mutation';
import styles from '../styles/EmailSubscribe.module.scss';

const ValidationScheme = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
});

const EmailSubscribe = () => {
    const [subscribe, { loading: mutationLoading }] = useMutation(SUBSCRIBE, {
        onCompleted: (data) => {
            message.success('Your email is subscribed. You will receive the latest news & updates.');
        },
        onError: error => {
            message.error(error.message);
        }
    });

    const onSubmit = (values: any, { resetForm }: any) => {
        subscribe({ variables: { email: values.email } });
        resetForm({
            values: {
                email: ''
            }
        })
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                email: ""
            }}
            onSubmit={onSubmit}
            validationSchema={ValidationScheme}
        >
            {() => (
                <Form layout="vertical" className={styles.form}>
                    {/* <FormItem name="email" className={styles.errorDisplayNone}> */}
                    <Input name="email" placeholder="Your Email*" className={styles.emailInput} />
                    {/* </FormItem> */}
                    <SubmitButton className={styles.subscribeNowBtn}>Subscribe Now</SubmitButton>
                </Form>
            )}
        </Formik>
    )
}

export default EmailSubscribe;