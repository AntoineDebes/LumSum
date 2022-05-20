import React, { FC, useRef } from 'react';
import { Col, Divider, message, Row } from 'antd';
import { Formik, FormikProps } from 'formik';
import { FormItem, Form, Input, SubmitButton } from 'formik-antd';
import styled from 'styled-components';
import { ChangePasswordSchema } from '../validation-schema';
import { gql, useMutation } from '@apollo/client';

const CHANGE_PASSWORD = gql`
    mutation changePasswordAsAdmin($currentPassword: String!, $newPassword: String!) {
        changePasswordAsAdmin(currentPassword:$currentPassword, newPassword: $newPassword)
    }
`;

const ChangePassword: FC = () => {
    const formRef = useRef<FormikProps<any>>(null);
    const [changePassword] = useMutation(CHANGE_PASSWORD,{
        onCompleted: () => {
            message.success('Password successfully changed!');
            formRef.current?.resetForm();
        },
        onError: (error) => {
            message.error(error.message);
            formRef.current?.setSubmitting(false);
        },
        fetchPolicy: 'no-cache',
    });
    const onSubmit = (values: any, _: any) => {
        changePassword({
            variables: values
        });
    }

    return (
        <div>
            <Divider orientation="left">Change Password</Divider>
            <Formik
                enableReinitialize={true}
                innerRef={formRef}
                initialValues={{
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                }}
                onSubmit={onSubmit}
                validationSchema={ChangePasswordSchema}
            >
                {() => (
                    <Form layout="vertical">
                        <Row gutter={{ xs: 8, md: 8 }}>
                            <Col span={8}>
                                <FormItem name="currentPassword" label="Current Password" required>
                                    <Input.Password name="currentPassword" placeholder="Current Password" />
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem name="newPassword" label="New Password" required>
                                    <Input.Password name="newPassword" placeholder="New Password" />
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem name="confirmPassword" label="Confirm Password" required>
                                    <Input.Password name="confirmPassword" placeholder="Confirm Password" />
                                </FormItem>
                            </Col>
                        </Row>
                        <Right>
                            <SubmitButton>Change</SubmitButton>
                        </Right>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ChangePassword;

const Right = styled.div`
    display: flex;
    justify-content: flex-end;
`;