import React, { FC, Fragment, useRef, useState } from "react";
import { Button, Modal, Tooltip, message, Image, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components/macro";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PRODUCT } from "../graphql/mutation";
import { PRODUCTS, CATEGORIES } from "../graphql/query";
import { Formik, FormikProps } from "formik";
import { Input, Form, FormItem, Select } from "formik-antd";
import { AddProductSchema } from "../validation-schema";
import AWS from "aws-sdk";
import CKEditor from "ckeditor4-react";

const AddNewProduct: FC = () => {
    const formRef = useRef<FormikProps<any>>(null);
    const [visible, setVisible] = useState<boolean>(false);

    const { loading: categoriesLoading, data } = useQuery(CATEGORIES, {
        fetchPolicy: "cache-and-network",
    });

    const [addNewProduct, { loading }] = useMutation(ADD_PRODUCT, {
        onCompleted: () => {
            message.success("Product added successfully!");
            onCancel();
        },
        onError: () => {
            message.error("Something error!");
        },
        fetchPolicy: "no-cache",
        refetchQueries: [{ query: PRODUCTS }],
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
        addNewProduct({
            variables: {
                id: `${values.id}-suppliers`,
                name: values.name,
                categoryId: values.categoryId,
                desc: values.desc,
                icon: res.Key,
                metaTitle: values.metaTitle,
                metaDesc: values.metaDesc,
                productText: values.productText
            },
        });
    };

    return (
        <Fragment>
            <Tooltip placement="left" title="Add New Product">
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
                title="Add New Product"
                confirmLoading={loading}
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
                        categoryId: "",
                        desc: "",
                        icon: null,
                        metaTitle: "",
                        metaDesc: "",
                        productText: ""
                    }}
                    onSubmit={onSubmit}
                    validationSchema={AddProductSchema}
                >
                    {({ setFieldValue, values }) => (
                        <Form layout="vertical">
                            <FormItem name="id" label="Id" required>
                                <Input name="id" placeholder="building-material" addonAfter="-suppliers" />
                            </FormItem>
                            <FormItem name="name" label="Product Name" required>
                                <Input name="name" placeholder="Product Name" />
                            </FormItem>
                            <FormItem name="categoryId" label="Category Name" required>
                                <Select name="categoryId" placeholder="Select Category" allowClear loading={categoriesLoading}>
                                    {data?.categories.map((category: any) => (
                                        <Select.Option key={category.id} value={category.id}>
                                            {category.name}
                                        </Select.Option>
                                    ))}
                                </Select>
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
                                value={values.productText}
                                onChange={(e: any) => setFieldValue("productText", e.editor.getData())}
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

export default AddNewProduct;

const LogoWrap = styled.div`
    margin-top: 15px;

    div {
        height: 150px;
        width: 150px;
    }
`;
