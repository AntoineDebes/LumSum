import { ArrowLeftOutlined, CameraOutlined } from "@ant-design/icons";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, message, Typography } from "antd";
import CKEditor from "ckeditor4-react";
import { Formik } from "formik";
import { Form, FormItem, Input, SubmitButton } from "formik-antd";
import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import Axios from "axios";
import AWS from "aws-sdk";
import { deleteS3File } from "../../utils";

CKEditor.editorUrl = "https://cdn.ckeditor.com/4.16.2/full/ckeditor.js";
const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    thumbnail: Yup.mixed().required("Thumbnail is required"),
    cover: Yup.mixed().required("Cover is required"),
    body: Yup.string().required("Body is required"),
});

interface MatchParams {
    id: string | undefined;
}

const BLOG = gql`
    query blog($id: ID!) {
        blog(id: $id) {
            id
            slug
            title
            body
            thumbnail
            cover
        }
    }
`;

const EDIT_BLOG = gql`
    mutation updateBlog($id: ID!, $title: String!, $body: String!, $thumbnail: String!, $cover: String!) {
        updateBlog(id: $id, title: $title, body: $body, cover: $cover, thumbnail: $thumbnail) {
            id
            slug
            title
            body
            thumbnail
            cover
        }
    }
`;

const EditBlog: FC<RouteComponentProps<MatchParams>> = ({ match, history }) => {
    const id = match.params.id;
    const { loading, data } = useQuery(BLOG, { variables: { id } });
    const [updateBlog] = useMutation(EDIT_BLOG);

    if (loading) return <div>loading</div>;
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                title: data.blog.title || "",
                cover: data.blog.cover || null,
                thumbnail: data.blog.thumbnail || null,
                body: data.blog.body || "",
            }}
            onSubmit={async (values: any, actions) => {
                try {
                    const variables = {
                        id,
                        ...values,
                    };
                    if (typeof values?.thumbnail === "object") {
                        const ext = values?.thumbnail.name.split(".").pop();
                        const key: string = `${new Date().getTime()}.${ext}`;
                        const upload = new AWS.S3.ManagedUpload({
                            params: {
                                Bucket: process.env.REACT_APP_S3_BUCKET!,
                                Key: key,
                                Body: values?.thumbnail,
                            },
                        });
                        const res = await upload.promise();
                        variables.thumbnail = res.Key;
                        // delete old thumbnail
                        await deleteS3File(data.blog.thumbnail);
                    }
                    if (typeof values?.cover === "object") {
                        const ext = values?.cover.name.split(".").pop();
                        const key: string = `${new Date().getTime()}.${ext}`;
                        const upload = new AWS.S3.ManagedUpload({
                            params: {
                                Bucket: process.env.REACT_APP_S3_BUCKET!,
                                Key: key,
                                Body: values?.cover,
                            },
                        });
                        const res = await upload.promise();
                        variables.cover = res.Key;
                        // delete old cover
                        await deleteS3File(data.blog.cover);
                    }
                    await updateBlog({ variables });
                    message.success("Blog updated");
                    actions.setSubmitting(false);
                } catch (error: any) {
                    message.error(error.message);
                }
            }}
            validationSchema={validationSchema}
        >
            {({ setFieldValue, values, errors }) => (
                <Form layout="vertical">
                    <Header>
                        <Button type="primary" shape="round" icon={<ArrowLeftOutlined />} onClick={history.goBack}>
                            Back
                        </Button>
                        <Title level={4}>Edit Blog</Title>
                        <SaveButton shape="round">Save</SaveButton>
                    </Header>
                    <Body>
                        <FormItem name="title" label="Title" required>
                            <Input name="title" placeholder="Title" />
                        </FormItem>
                        <FormItem name="thumbnail" label="Thumbnail" required>
                            <InputImage
                                id="blog_thumbnail"
                                name="thumbnail"
                                onChange={(event: any) => {
                                    setFieldValue("thumbnail", event.currentTarget.files[0]);
                                }}
                            />
                            <BlogCoverContainer
                                error={Boolean(errors.thumbnail)}
                                url={
                                    values.thumbnail && typeof values.thumbnail === "object"
                                        ? URL.createObjectURL(values.thumbnail)
                                        : `${process.env.REACT_APP_IMAGE_URL}${data.blog.thumbnail}`
                                }
                            >
                                <BlogCoverLabel htmlFor="blog_thumbnail">
                                    <CameraOutlined /> Upload Blog Thumbnail!
                                </BlogCoverLabel>
                            </BlogCoverContainer>
                        </FormItem>
                        <FormItem name="cover" label="Cover" required>
                            <InputImage
                                id="blog_cover"
                                name="cover"
                                onChange={(event: any) => {
                                    setFieldValue("cover", event.currentTarget.files[0]);
                                }}
                            />
                            <BlogCoverContainer
                                error={Boolean(errors.cover)}
                                url={
                                    values.cover && typeof values.cover === "object"
                                        ? URL.createObjectURL(values.cover)
                                        : `${process.env.REACT_APP_IMAGE_URL}${data.blog.cover}`
                                }
                            >
                                <BlogCoverLabel htmlFor="blog_cover">
                                    <CameraOutlined /> Upload Blog Cover!
                                </BlogCoverLabel>
                            </BlogCoverContainer>
                        </FormItem>
                        <FormItem name="body" label="Blog" required>
                            <CKEditor
                                data={values.body}
                                onChange={(e: any) => {
                                    setFieldValue("body", e.editor.getData());
                                }}
                                placeholder="Write something..."
                            />
                        </FormItem>
                    </Body>
                    {/* <FormikDebug /> */}
                </Form>
            )}
        </Formik>
    );
};

export default EditBlog;

const Header = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    box-shadow: 0 0 1px rgb(0 0 0 / 50%);
    padding: 8px 12px;
    border-radius: 4px;
`;

const Title = styled(Typography.Title)`
    margin-bottom: 0 !important;
    margin-left: 8px;
    border-left: 2px solid rgba(0, 0, 0, 0.3);
    padding-left: 8px;
    color: rgba(0, 0, 0, 0.65);
`;

const Body = styled.header`
    width: 100%;
    padding: 8px 12px;
    margin-top: 15px;
`;

const SaveButton = styled(SubmitButton)`
    margin-left: auto;
`;

const BlogCoverLabel = styled.label`
    background-color: rgba(0, 0, 0, 0.4);
    color: #ffffff;
    padding: 8px 12px;
    border-radius: 4px;

    &:hover {
        transition: all 0.5ms ease-in-out;
        background-color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
    }
`;

const InputImage = styled.input.attrs(() => ({
    type: "file",
    accept: "image/*",
}))`
    display: none !important;
`;

const BlogCoverContainer = styled.div<{
    url: string | undefined;
    error: boolean;
}>`
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;

    border-radius: 4px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    ${({ url }) =>
        url &&
        `
    background-image: url(${url});
  `}
    ${({ error }) =>
        error &&
        `
  border: 1px solid red;
  `}
`;

BlogCoverContainer.defaultProps = {
    url: undefined,
};
