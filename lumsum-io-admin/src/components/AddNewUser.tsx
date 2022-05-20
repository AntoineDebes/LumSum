import React, { FC, Fragment, useRef, useState } from "react";
import { Button, Modal, Tooltip, message, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Formik, FormikProps } from "formik";
import { Form, FormItem, Input } from "formik-antd";
import * as Yup from "yup";
import { ADD_USER } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
import { USERS } from "../graphql/query";
import AWS from "aws-sdk";

const SupplierSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    avatar: Yup.mixed().required("Image File is required!"),
});

const AddNewSupplier: FC = () => {
    const formRef = useRef<FormikProps<any>>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [addUser, { loading }] = useMutation(ADD_USER, {
        onCompleted: () => {
            message.success("Category added successfully!");
            onCancel();
        },
        onError: (error: any) => {
            console.log(error.message);
            message.error(error.message);
        },
        fetchPolicy: "no-cache",
        refetchQueries: [{ query: USERS }],
    });

    const onCancel = () => {
        if (formRef.current) {
            formRef.current.resetForm();
        }
        setVisible(false);
    };

    const onOk = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    };

    const onSubmit = async (values: any, actions: any) => {
        const ext = values.avatar.name.split(".").pop();
        const key: string = `${new Date().getTime()}.${ext}`;
        const upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: process.env.REACT_APP_S3_BUCKET!,
                Key: key,
                Body: values.avatar,
            },
        });
        const res = await upload.promise();
        addUser({ variables: { ...values, avatar: res.Key } });
    };

    return (
        <Fragment>
            <Tooltip placement="left" title="Add New User">
                <Button
                    onClick={() => setVisible(true)}
                    type="primary"
                    shape="round"
                    icon={<PlusOutlined />}
                    size="large"
                    className="add-new"
                >
                    New
                </Button>
            </Tooltip>
            <Modal
                visible={visible}
                title="Add New Category"
                okText="Submit"
                confirmLoading={loading}
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={onOk}
                footer={[
                    <Button key="back" onClick={onCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={onOk}>
                        Submit
                    </Button>,
                ]}
                maskClosable={false}
            >
                <Formik
                    enableReinitialize={true}
                    innerRef={formRef}
                    initialValues={{
                        email: "",
                        name: "",
                        avatar: null,
                    }}
                    onSubmit={onSubmit}
                    validationSchema={SupplierSchema}
                >
                    {({ setFieldValue, values }) => (
                        <Form layout="vertical">
                            <FormItem name="email" label="Email" required>
                                <Input name="email" placeholder="Email" />
                            </FormItem>
                            <FormItem name="name" label="Name" required>
                                <Input name="name" placeholder="Name" />
                            </FormItem>
                            <FormItem name="avatar" label="Avatar" required>
                                <input
                                    name="avatar"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event: any) => {
                                        setFieldValue("avatar", event.currentTarget.files[0]);
                                    }}
                                />
                                {values.avatar && (
                                    <LogoWrap>
                                        <Image src={URL.createObjectURL(values.avatar)} />
                                    </LogoWrap>
                                )}
                            </FormItem>
                            {/* <FormikDebug /> */}
                        </Form>
                    )}
                </Formik>
            </Modal>
        </Fragment>
    );
};

export default AddNewSupplier;

const LogoWrap = styled.div`
    margin-top: 15px;

    div {
        height: 150px;
        width: 150px;
    }
`;
