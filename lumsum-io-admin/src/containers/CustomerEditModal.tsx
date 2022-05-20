import { Button, Image, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import { Formik, FormikProps } from "formik";
import { Input, FormikDebug, Form, FormItem } from "formik-antd";
import React, { FC, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import { UPDATE_USER } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
import { USER } from "../graphql/query";
import AWS from "aws-sdk";
import { deleteS3File } from "../utils";

const SupplierSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    avatar: Yup.mixed().required("Image File is required!"),
});

interface SupplierEditModalProps {
    match: any;
    user: any;
}

interface IParams {
    userId: string | undefined;
}

const CustomerEditModal: FC<SupplierEditModalProps> = ({ match, user }) => {
    const history = useHistory();
    const { userId } = useParams<IParams>();
    const formRef = useRef<FormikProps<any>>(null);
    const [updateUser, { loading, error }] = useMutation(UPDATE_USER, {
        onCompleted: (data) => {
            if (data.updateUser) {
                message.success("User Updated!");
                history.goBack();
            } else {
                message.success("Something Error!");
            }
        },
        onError: (error) => {
            console.info("onError");
            console.log(error.message);
            message.error(error.message);
            // message.error(JSON.stringify(error));
        },
        refetchQueries: [{ query: USER, variables: { id: userId } }],
    });
    const onCancel = () => {
        if (formRef.current) {
            formRef.current.resetForm();
        }
        history.goBack();
    };
    const onOk = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    };
    const onSubmit = async (values: any, actions: any) => {
        const variables = {
            id: userId,
            email: values.email,
            name: values.name,
            avatar: values.avatar,
        };
        if (values.avatar !== null && typeof values.avatar === "object") {
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
            variables.avatar = res.Key;
            // delete old avatar
            await deleteS3File(user.avatar);
        }
        updateUser({ variables });
    };
    return (
        <Modal
            visible={Boolean(match)}
            title="Edit Supplier Info"
            onCancel={onCancel}
            onOk={onOk}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={onOk}>
                    Update
                </Button>,
            ]}
            maskClosable={false}
        >
            <Formik
                enableReinitialize={true}
                innerRef={formRef}
                initialValues={{ ...user, email: user.user.email }}
                onSubmit={onSubmit}
                validationSchema={SupplierSchema}
            >
                {({ setFieldValue, values, errors, touched }) => (
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
                                    <Image
                                        src={
                                            typeof values.avatar === "object"
                                                ? URL.createObjectURL(values.avatar)
                                                : `${process.env.REACT_APP_IMAGE_URL}${values.avatar}`
                                        }
                                    />
                                </LogoWrap>
                            )}
                        </FormItem>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default CustomerEditModal;

const SocialMediaAccounts = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 15px;
`;

const LogoWrap = styled.div`
    margin-top: 15px;

    div {
        height: 150px;
        width: 150px;
    }
`;
