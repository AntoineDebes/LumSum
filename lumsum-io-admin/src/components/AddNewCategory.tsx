import React, { FC, Fragment, useRef, useState } from "react";
import { Button, Modal, Tooltip, message, Image, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components/macro";
import { useMutation } from "@apollo/client";
import { Formik, FormikProps } from "formik";
import { Input, Form, FormItem } from "formik-antd";
import { ADD_CATEGORY } from "../graphql/mutation";
import { CATEGORIES } from "../graphql/query";
import { AddCategorySchema } from "../validation-schema";
import CKEditor from "ckeditor4-react";
import AWS from "aws-sdk";

const AddNewCategory: FC = () => {
    const formRef = useRef<FormikProps<any>>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [addNewCategory, { loading }] = useMutation(ADD_CATEGORY, {
        onCompleted: () => {
            message.success("Category added successfully!");
            onCancel();
        },
        onError: (error) => {
            message.error(error.message);
        },
        fetchPolicy: "no-cache",
        refetchQueries: [{ query: CATEGORIES }],
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
        const ext = values.icon.name.split(".").pop();
        const key: string = `${new Date().getTime()}.${ext}`;
        const upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: process.env.REACT_APP_S3_BUCKET!,
                Key: key,
                Body: values.icon,
            },
        });
        const res = await upload.promise();
        addNewCategory({
            variables: {
                id: `${values.id}-suppliers`,
                name: values.name,
                desc: values.desc,
                icon: res.Key,
                metaTitle: values.metaTitle,
                metaDesc: values.metaDesc,
                categoryText: values.categoryText,
            },
        });
    };

    return (
        <Fragment>
            <Tooltip placement="left" title="Add New Category">
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
                        id: "",
                        name: "",
                        desc: "",
                        icon: null,
                        metaTitle: "",
                        metaDesc: "",
                        categoryText: "",
                    }}
                    onSubmit={onSubmit}
                    validationSchema={AddCategorySchema}
                >
                    {({ setFieldValue, values, errors, touched }) => (
                        <Form layout="vertical">
                            <FormItem name="id" label="Id" required>
                                <Input name="id" placeholder="building-material" addonAfter="-suppliers" />
                            </FormItem>
                            <FormItem name="name" label="Category Name" required>
                                <Input name="name" placeholder="Category Name" />
                            </FormItem>
                            <FormItem name="desc" label="Description" required>
                                <Input.TextArea name="desc" placeholder="Description" />
                            </FormItem>
                            <FormItem name="icon" label="Icon" required>
                                <input
                                    name="icon"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event: any) => {
                                        setFieldValue("icon", event.currentTarget.files[0]);
                                    }}
                                />
                                {values.icon && (
                                    <LogoWrap>
                                        <Image src={URL.createObjectURL(values.icon)} />
                                    </LogoWrap>
                                )}
                            </FormItem>
                            <Divider>SEO</Divider>
                            <FormItem name="metaTitle" label="Meta Title" required>
                                <Input name="metaTitle" placeholder="Meta Title" />
                            </FormItem>
                            <FormItem name="metaDesc" label="Meta Description" required>
                                <Input.TextArea name="metaDesc" placeholder="Meta Description" />
                            </FormItem>

                            <CKEditor
                                value={values.categoryText}
                                onChange={(e: any) => setFieldValue("categoryText", e.editor.getData())}
                                placeholder="Write something..."
                            />
                            {/* <FormikDebug /> */}
                        </Form>
                    )}
                </Formik>
            </Modal>
        </Fragment>
    );
};

export default AddNewCategory;

const LogoWrap = styled.div`
    margin-top: 15px;

    div {
        height: 150px;
        width: 150px;
    }
`;
