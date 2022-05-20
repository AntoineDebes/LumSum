import { ArrowLeftOutlined, CameraOutlined } from "@ant-design/icons";
import { gql, useMutation } from "@apollo/client";
import { Button, message, Typography } from "antd";
import CKEditor from "ckeditor4-react";
import { Formik } from "formik";
import { Form, FormItem, Input, SubmitButton } from "formik-antd";
import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import AWS from "aws-sdk";

CKEditor.editorUrl = "https://cdn.ckeditor.com/4.16.2/full/ckeditor.js";
const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    thumbnail: Yup.mixed().required("Thumbnail is required"),
    cover: Yup.mixed().required("Cover is required"),
    body: Yup.string().required("Body is required"),
});

const ADD_BLOG = gql`
    mutation addBlog($title: String!, $body: String!, $cover: String!, $thumbnail: String!) {
        addBlog(title: $title, body: $body, cover: $cover, thumbnail: $thumbnail) {
            id
            slug
            title
            body
        }
    }
`;

const AddAdmin: FC<RouteComponentProps> = ({ history }) => {
    const [addBlog] = useMutation(ADD_BLOG);
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                title: "",
                thumbnail: null,
                cover: null,
                body: "",
            }}
            onSubmit={async (values: any, actions) => {
                try {
                    let coverUrl = "";
                    let thumbnailUrl = "";
                    if (values?.thumbnail) {
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
                        thumbnailUrl = res.Key;
                    }
                    if (values?.cover) {
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
                        coverUrl = res.Key;
                    }

                    const variables = {
                        title: values.title,
                        body: values.body,
                        thumbnail: thumbnailUrl,
                        cover: coverUrl,
                    };
                    await addBlog({ variables });
                    message.success("Blog added");
                    actions.resetForm({
                        values: {
                            title: "",
                            thumbnail: null,
                            cover: null,
                            body: "",
                        },
                    });
                    history.push("/blogs");
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
                        <Title level={4}>Add Blog</Title>
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
                                url={values.thumbnail ? URL.createObjectURL(values.thumbnail) : undefined}
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
                                url={values.cover ? URL.createObjectURL(values.cover) : undefined}
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

export default AddAdmin;

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

const Body = styled.div`
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
