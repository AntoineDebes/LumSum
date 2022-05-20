import React, { FC } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Table, Button, Image, Space, Tooltip } from "antd";
import { useMutation } from "@apollo/client";
import { DELETE_SUPPLIER_IMAGE } from "../graphql/mutation";
import AWS from "aws-sdk";

AWS.config.update({
    region: process.env.REACT_APP_S3_REGION,
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
});

type onDeleteFinish = () => void;

interface SupplierImagesProps {
    images: [];
    loading: boolean;
    onDeleteFinish: onDeleteFinish;
}

const SupplierImages: FC<SupplierImagesProps> = ({ loading, images, onDeleteFinish }) => {
    const [deleteSupplierImage] = useMutation(DELETE_SUPPLIER_IMAGE, {
        onCompleted: (data) => {
            onDeleteFinish();
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const deletePhotoHandler = (image: any) => {
        const s3 = new AWS.S3({
            params: {
                Bucket: process.env.REACT_APP_S3_BUCKET,
                Key: image.image,
            },
        });

        s3.deleteObject(function (err, data) {
            if (err) {
                console.log("There was an error deleting your photo: ", err.message);
            }

            deleteSupplierImage({
                variables: { id: image.id },
            });
        });
    };

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image: any) => <Image width={100} src={`${process.env.REACT_APP_IMAGE_URL}${image}`} />,
        },
        {
            title: "Name",
            key: "index",
            render: (text: any, record: any, index: any) => `Image ${index + 1}`,
        },
        {
            title: "Actions",
            key: "operation",
            width: "200px",
            render: (image: any) => (
                <Space size="middle">
                    <Tooltip title="Delete">
                        <Button
                            onClick={() => deletePhotoHandler(image)}
                            type="primary"
                            ghost
                            shape="circle"
                            icon={<DeleteOutlined />}
                            size="middle"
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <Table
            rowKey={(image) => image.id}
            loading={loading}
            sticky={true}
            dataSource={images}
            columns={columns}
            bordered
            style={{ paddingBottom: "20px" }}
            pagination={false}
        />
    );
};

export default SupplierImages;
