import React, { FC } from "react";
import { Button as AntdButton, Table, Typography, Image as AntdImage, Tooltip, Space, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import styled from "styled-components/macro";
import { useQuery, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { CATEGORIES } from "../graphql/query";
import { DELETE_CATEGORY } from "../graphql/mutation";
import AddNewCategory from "../components/AddNewCategory";
import { Helmet } from "react-helmet";
import { deleteS3File } from "../utils";

const Dashboard: FC = () => {
    const history = useHistory();
    const { loading, error, data } = useQuery(CATEGORIES, {
        fetchPolicy: "cache-and-network",
    });
    const [removeCategory] = useMutation(DELETE_CATEGORY, {
        onCompleted: () => message.success("Category successfully deleted"),
        onError: () => message.error("Something Error!"),
    });

    const deleteCategory = (id: string, icon: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this category!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then(async (result) => {
            if (result.value) {
                const res = await removeCategory({
                    variables: { id },
                    update: (caches: any, { data: updateData }) => {
                        const prevData = caches.readQuery({ query: CATEGORIES });
                        let categories = prevData.categories;
                        categories = categories.filter((category: any) => category.id !== id);
                        caches.writeQuery({ query: CATEGORIES, data: { categories } });
                    },
                });
                if (res.data.removeCategory) {
                    await deleteS3File(icon);
                }
            }
        });
    };

    const columns = [
        {
            title: "Icon",
            key: "image",
            width: "120px",
            className: "center",
            render: (category: any) => {
                return <Image src={`${process.env.REACT_APP_IMAGE_URL}${category.icon}`} />;
            },
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            ellipsis: true,
        },
        {
            title: "Actions",
            key: "operation",
            width: "164px",
            className: "center",
            render: (category: any) => (
                <Space size="middle">
                    <Tooltip title="View">
                        <Button
                            onClick={() => history.push(`/categories/${category.id}`)}
                            type="primary"
                            ghost
                            shape="circle"
                            icon={<EyeOutlined />}
                            size="middle"
                        />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button
                            onClick={() => history.push(`/categories/${category.id}/edit`)}
                            type="primary"
                            ghost
                            shape="circle"
                            icon={<EditOutlined />}
                            size="middle"
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            value={category.id}
                            onClick={() => deleteCategory(category.id, category.icon)}
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
        <div>
            <Helmet>
                <title>Lumsum | Categories</title>
            </Helmet>
            <NewButtonWrapper>
                <Title level={3}>All Categories</Title>
                <AddNewCategory />
            </NewButtonWrapper>
            <TableContainer>
                <Table
                    rowKey={(category) => category.id}
                    loading={loading}
                    sticky={true}
                    dataSource={data?.categories}
                    columns={columns}
                    bordered
                    size="small"
                />
            </TableContainer>
        </div>
    );
};

export default Dashboard;

const TableContainer = styled.div`
    table {
        th.center,
        td.center {
            width: 100px;
            text-align: center;
        }
    }
`;

const Image = styled(AntdImage)`
    img {
        height: 75px;
        width: 75px;
        object-fit: cover;
        object-position: center;
    }
`;

const NewButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px auto;
`;

const Title = styled(Typography.Title)`
    margin: 0 !important;
`;

const Button = styled(AntdButton)`
    background-color: #049e94;
    border-color: #049e94;

    &.ant-btn-background-ghost {
        color: #049e94;
        border-color: #049e94;
    }
`;
