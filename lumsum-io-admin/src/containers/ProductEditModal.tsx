import { Button, Divider, Image, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import { Formik, FormikProps } from "formik";
import { Input, Form, FormItem, Select } from "formik-antd";
import React, { FC, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { UPDATE_PRODUCT } from "../graphql/mutation";
import { useMutation, useQuery } from "@apollo/client";
import { CATEGORIES, PRODUCT } from "../graphql/query";
import { EditProductSchema } from "../validation-schema";
import AWS from "aws-sdk";
import { deleteS3File } from "../utils";
import CKEditor from "ckeditor4-react";

interface SupplierEditModalProps {
    match: any;
    product: any;
}

interface IParams {
    productId: string | undefined;
}

const ProductEditModal: FC<SupplierEditModalProps> = ({ match, product }) => {
    const history = useHistory();
    const { productId } = useParams<IParams>();
    const formRef = useRef<FormikProps<any>>(null);
    const { loading: categoriesLoading, data } = useQuery(CATEGORIES, {
        fetchPolicy: "cache-and-network",
    });
    const [updateProduct, { loading, error }] = useMutation(UPDATE_PRODUCT, {
        onCompleted: (data) => {
            if (data.updateProduct) {
                message.success("Product Updated!");
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
        refetchQueries: [{ query: PRODUCT, variables: { id: productId } }],
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
            id: productId,
            name: values.name,
            categoryId: values.categoryId,
            description: values.description,
            icon: values.icon,
            metaTitle: values.metaTitle,
            metaDesc: values.metaDesc,
            productText: values.productText
        };
        if (values.icon !== null && typeof values.icon === "object") {
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
            variables.icon = res.Key;
            // delete old icon
            await deleteS3File(product.icon);
        }
        updateProduct({ variables });
    };
    return (
        <Modal
            visible={Boolean(match)}
            title="Edit Product Info"
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
                initialValues={{ ...product, categoryId: product.category.id }}
                onSubmit={onSubmit}
                validationSchema={EditProductSchema}
            >
                {({ setFieldValue, values, errors, touched }) => (
                    <Form layout="vertical">
                        <FormItem name="name" label="Product Name" required>
                            <Input name="name" placeholder="Product Name" />
                        </FormItem>
                        <FormItem name="categoryId" label="Category Name" required>
                            <Select name="categoryId" placeholder="Select Category" allowClear loading={categoriesLoading}>
                                {data?.categories.map((category: any) => (
                                    <Select.Option name="categoryId" key={category.id} value={category.id}>
                                        {category.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </FormItem>
                        <FormItem name="description" label="Description" required>
                            <Input.TextArea name="description" placeholder="Description" />
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
                                    <Image
                                        src={
                                            typeof values.icon === "object"
                                                ? URL.createObjectURL(values.icon)
                                                : `${process.env.REACT_APP_IMAGE_URL}${values.icon}`
                                        }
                                    />
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
                            data={values.productText}
                            onChange={(e: any) => setFieldValue("productText", e.editor.getData())}
                            placeholder="Write something..."
                        />
                        {/* <FormikDebug /> */}
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default ProductEditModal;

const LogoWrap = styled.div`
    margin-top: 15px;

    div {
        height: 150px;
        width: 150px;
    }
`;
