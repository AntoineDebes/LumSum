import {Button, Divider, Image, message} from "antd";
import Modal from "antd/lib/modal/Modal";
import {Formik, FormikProps} from "formik";
import {Input, Form, FormItem, Switch} from "formik-antd";
import React, {FC, useRef} from "react";
import {useHistory, useParams} from "react-router-dom";
import styled from "styled-components";
import {UPDATE_CATEGORY} from "../graphql/mutation";
import {useMutation} from "@apollo/client";
import {EditCategorySchema} from "../validation-schema";
import {CATEGORY} from "../graphql/query";
import CKEditor from "ckeditor4-react";
import AWS from "aws-sdk";
import {deleteS3File, uploadS3File, generateKeyFromName} from "../utils";

interface SupplierEditModalProps {
    match: any;
    category: any;
}

interface IParams {
    categoryId: string | undefined;
}

const SupplierEditModal: FC<SupplierEditModalProps> = ({match, category}) => {
    const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
    const history = useHistory();
    const {categoryId} = useParams<IParams>();
    const formRef = useRef<FormikProps<any>>(null);
    const [updateCategory, {loading, error}] = useMutation(UPDATE_CATEGORY, {
        onCompleted: (data) => {
            if (data.updateCategory) {
                message.success("Category Updated Successfully!");
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
        refetchQueries: [{query: CATEGORY, variables: {id: categoryId}}],
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
            id: categoryId,
            name: values.name,
            description: values.description,
            icon: values.icon,
            banner: values.banner,
            bannerMobile: values.bannerMobile,
            bannerActive: values.bannerActive,
            bannerUrl: values.bannerUrl,
            metaTitle: values.metaTitle,
            metaDesc: values.metaDesc,
            categoryText: values.categoryText,
        };
        // upload icon
        if (values.icon !== null && typeof values.icon === "object") {
            variables.icon = (await uploadS3File(generateKeyFromName(values.icon.name), values.icon)).Key;
            // delete old icon
            await deleteS3File(category.icon);
        }
        // upload banner
        if (values.banner && typeof values.banner === "object") {
            variables.banner = (await uploadS3File(generateKeyFromName(values.banner.name), values.banner)).Key;
            //delete old one
            await deleteS3File(category.banner);
        }
        // upload banner mobile
        if (values.bannerMobile && typeof values.bannerMobile === "object"){
            variables.bannerMobile  = (await uploadS3File(generateKeyFromName(values.bannerMobile.name), values.bannerMobile)).Key;
            //delete old one
            await deleteS3File(category.banner);
        }

        updateCategory({variables});
    };
    return (
        <Modal
            visible={Boolean(match)}
            title="Edit Category Info"
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
                initialValues={category}
                onSubmit={onSubmit}
                validationSchema={EditCategorySchema}
            >
                {({setFieldValue, values, errors, touched}) => (
                    <Form layout="vertical">
                        <FormItem name="name" label="Category Name" required>
                            <Input name="name" placeholder="Category Name"/>
                        </FormItem>
                        <FormItem name="description" label="Description" required>
                            <Input.TextArea name="description" placeholder="Description"/>
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
                                                : `${IMAGE_URL}${values.icon}`
                                        }
                                    />
                                </LogoWrap>
                            )}
                        </FormItem>
                        <Divider>SEO</Divider>
                        <FormItem name="metaTitle" label="Meta Title" required>
                            <Input name="metaTitle" placeholder="Meta Title"/>
                        </FormItem>
                        <FormItem name="metaDesc" label="Meta Description" required>
                            <Input.TextArea name="metaDesc" placeholder="Meta Description"/>
                        </FormItem>
                        <CKEditor
                            data={values.categoryText}
                            onChange={(e: any) => setFieldValue("categoryText", e.editor.getData())}
                            placeholder="Write something..."
                        />
                        <FormItem name="banner" label="Banner" required>
                            <input
                                name="banner"
                                type="file"
                                accept="image/*"
                                onChange={(event: any) => {
                                    setFieldValue("banner", event.currentTarget.files[0]);
                                }}
                            />
                            {values.banner && (
                                <LogoWrap>
                                    <Image
                                        src={
                                            typeof values.banner === "object"
                                                ? URL.createObjectURL(values.banner)
                                                : `${IMAGE_URL}${values.banner}`
                                        }
                                    />
                                </LogoWrap>
                            )}
                        </FormItem>
                        <FormItem name="bannerMobile" label="Banner mobile" required>
                            <input
                                name="bannerMobile"
                                type="file"
                                accept="image/*"
                                onChange={(event: any) => {
                                    setFieldValue("bannerMobile", event.currentTarget.files[0]);
                                }}
                            />
                            {console.log(values)}
                            {values.bannerMobile && (
                                <LogoWrap>
                                    <Image
                                        src={
                                            typeof values.bannerMobile === "object"
                                                ? URL.createObjectURL(values.bannerMobile)
                                                : `${IMAGE_URL}${values.bannerMobile}`
                                        }
                                    />
                                </LogoWrap>
                            )}
                        </FormItem>
                        <FormItem name="bannerUrl" label="Banner URL" required>
                            <Input name="bannerUrl" placeholder="Banner URL"/>
                        </FormItem>
                        <FormItem name="bannerActive" label="Banner Active" required>
                            <Switch name="bannerActive"/>
                        </FormItem>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default SupplierEditModal;

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
