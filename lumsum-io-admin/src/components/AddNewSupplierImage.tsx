import React, { FC, Fragment, useState } from "react";
import { Button, Modal, Form, Tooltip, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AWS from "aws-sdk";
import { useMutation } from "@apollo/client";
import { ADD_IMAGE_SUPPLIER } from "../graphql/mutation";

type OnCreate = (values: any) => void;
type OnCancel = () => void;
type onUploadFinish = () => void;

interface AddSupplierFormProps {
    visible: boolean;
    submitting: boolean;
    maxImages: number;
    onCreate: OnCreate;
    onCancel: OnCancel;
}

interface AddImageSupplierProps {
    supplierId: string | undefined;
    maxImages: number;
    onUploadFinish: onUploadFinish;
}

const AddSupplierForm: FC<AddSupplierFormProps> = ({ visible, submitting, maxImages, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [images, setImages] = useState<FileList | null>(null);

    const handleImageChange = ({ currentTarget: { files } }: React.ChangeEvent<HTMLInputElement>) => {
        if (files && files.length) {
            setImages(files);
        }
    };

    const onOk = () => {
        form.validateFields()
            .then(() => {
                if (images && images.length <= maxImages) {
                    onCreate(images);
                    form.resetFields();
                    setImages(null);
                } else {
                    alert("Max no of images an be 5");
                    form.resetFields();
                    setImages(null);
                }
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    return (
        <Modal
            visible={visible}
            title="Add New Supplier Image"
            okText="Upload"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={onOk}
            okButtonProps={{ disabled: submitting }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: "public",
                }}
            >
                <Form.Item label="File" name="file" rules={[{ required: true, message: "Please input files!" }]}>
                    <Input multiple type="file" onChange={handleImageChange} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const AddNewSupplierImage: FC<AddImageSupplierProps> = ({ supplierId, maxImages, onUploadFinish }) => {
    const [visible, setVisible] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [addImageOfSupplier] = useMutation(ADD_IMAGE_SUPPLIER, {
        onError: (error) => {
            console.error(error);
            setSubmitting(false);
        },
    });

    const onCreate: OnCreate = async (values) => {
        setSubmitting(true);
        const params = [];
        for (let i = 0; i < values.length; i++) {
            const ext = values[i].name.split(".").pop();
            const key: string = `${new Date().getTime() + i}.${ext}`;
            params.push({
                Bucket: process.env.REACT_APP_S3_BUCKET!,
                Key: key,
                Body: values[i],
            });
        }

        const responses = await Promise.all(
            params.map((param) =>
                new AWS.S3.ManagedUpload({
                    params: { ...param },
                })
                    .promise()
                    .then((res) => {
                        addImageOfSupplier({
                            variables: { id: supplierId, image: res.Key },
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        setSubmitting(false);
                    })
            )
        );

        if (responses.length) {
            setVisible(false);
            setSubmitting(false);
            onUploadFinish();
        }
    };

    return (
        <Fragment>
            <Tooltip placement="left" title="Upload Image">
                <Button onClick={() => setVisible(true)} type="primary" shape="round">
                    <UploadOutlined />
                    Upload
                </Button>
            </Tooltip>
            <AddSupplierForm
                visible={visible}
                submitting={submitting}
                maxImages={maxImages}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </Fragment>
    );
};

export default AddNewSupplierImage;
