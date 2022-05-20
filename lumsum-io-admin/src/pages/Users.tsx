import React, { FC } from "react";
import { Button, Space, Table, Tooltip, Typography, Image as AntdImage, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { useMutation, useQuery } from "@apollo/client";
import { USERS } from "../graphql/query";
import AddNewUser from "../components/AddNewUser";
import { REMOVE_USER } from "../graphql/mutation";
import { deleteS3File } from "../utils";

const Users: FC = () => {
    const history = useHistory();
    const { loading, error, data } = useQuery(USERS, {
        fetchPolicy: "cache-and-network",
    });

    const [removeUser, { loading: removeSupplierLoading }] = useMutation(REMOVE_USER, {
        onCompleted: () => message.success("User Deleted Successfully"),
        onError: () => message.error("Something Error!"),
        refetchQueries: [{ query: USERS }],
    });

    const deleteUser = (id: string, avatar: string) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
            showLoaderOnConfirm: true,
        }).then(async (result) => {
            if (result.value) {
                const res = await removeUser({
                    variables: { id },
                });
                if (res.data.removeUser) {
                    await deleteS3File(avatar);
                }
            }
        });
    };

    const columns = [
        {
            title: "Avatar",
            key: "avatar",
            width: "120px",
            className: "center",
            render: (values: any) => <Image src={`${process.env.REACT_APP_IMAGE_URL}${values.avatar}`} />,
        },
        {
            title: "Name",
            key: "name",
            dataIndex: "name",
            ellipsis: true,
        },
        {
            title: "Email",
            key: "email",
            ellipsis: true,
            render: (customer: any) => <Typography.Text>{customer.user.email}</Typography.Text>,
        },
        {
            title: "Actions",
            key: "operation",
            width: "164px",
            className: "center",
            render: (user: any) => (
                <Space size="middle">
                    <Tooltip title="View">
                        <Button
                            onClick={() => history.push(`/users/${user.id}`)}
                            type="primary"
                            ghost
                            shape="circle"
                            icon={<EyeOutlined />}
                            size="middle"
                        />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button
                            onClick={() => history.push(`/users/${user.id}/edit`)}
                            type="primary"
                            ghost
                            shape="circle"
                            icon={<EditOutlined />}
                            size="middle"
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            onClick={() => deleteUser(user.id, user.avatar)}
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
                <title>Lumsum | Users</title>
            </Helmet>
            <NewButtonWrapper>
                <Title level={3}>All Users</Title>
                <AddNewUser />
            </NewButtonWrapper>
            <TableContainer>
                <Table
                    rowKey={(product) => product.id}
                    loading={loading}
                    sticky={true}
                    dataSource={data?.users}
                    columns={columns}
                    bordered
                />
            </TableContainer>
        </div>
    );
};

export default Users;

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
