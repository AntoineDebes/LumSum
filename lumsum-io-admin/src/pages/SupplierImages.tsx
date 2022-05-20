import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components/macro";
import { Button, Space, Table, Tooltip, Typography, Image } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { SUPPLIER } from "../graphql/query";
import { DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import AWS from "aws-sdk";
import { DELETE_SUPPLIER_IMAGE } from "../graphql/mutation";

AWS.config.update({
    region: process.env.REACT_APP_S3_REGION,
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
});

interface AddImageSupplierParams {
    supplierId: string;
}

const SupplierImages = () => {
    const { supplierId } = useParams<AddImageSupplierParams>();

    const { loading, data, refetch } = useQuery(SUPPLIER, {
        variables: { id: supplierId },
        fetchPolicy: "cache-and-network",
    });

    const fetchingHandler = () => {
        refetch();
    };

    const [deleteSupplierImage] = useMutation(DELETE_SUPPLIER_IMAGE, {
        onCompleted: (data) => {
            fetchingHandler();
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image: any) => <Image width={100} src={image} />,
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

    const deletePhotoHandler = (image: any) => {
        const url = image.image.split("/");
        const key = url[url.length - 1];
        const s3 = new AWS.S3({
            params: {
                Bucket: process.env.REACT_APP_S3_BUCKET,
                Key: key,
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

    return (
        <div>
            <Helmet>
                <title>Lumsum | Supplier Images</title>
            </Helmet>

            <NewButtonWrapper>
                <Title level={3}>{data?.supplier?.tradeName} Images</Title>
                {/* {data?.supplier?.images.length < 5 && <AddNewSupplierImage supplierId={supplierId} onUploadFinish={fetchingHandler} />} */}
            </NewButtonWrapper>
            <Table
                rowKey={(supplier) => supplier.id}
                loading={loading}
                sticky={true}
                dataSource={data?.supplier?.images}
                columns={columns}
                bordered
            />
        </div>
    );
};

export default SupplierImages;

const NewButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px auto;
`;

const Title = styled(Typography.Title)`
    margin: 0 !important;
`;
