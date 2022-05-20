import React, { FC, SyntheticEvent, useState } from "react";
import { Button, message, Space, Table, Tooltip, Typography } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, MobileOutlined, PhoneOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import styled from "styled-components/macro";
import { gql, useMutation, useQuery } from "@apollo/client";
import { SUPPLIERS } from "../graphql/query";
import AddNewSupplier from "../components/AddNewSupplier";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import { REMOVE_SUPPLIER } from "../graphql/mutation";
import Swal from "sweetalert2";
import Search from "antd/lib/input/Search";
import { deleteS3File } from "../utils";

const FEATURED = gql`
    mutation featured($supplierId: ID!) {
        featured(supplierId: $supplierId) {
            id
        }
    }
`;

const Suppliers: FC = () => {
    const [search, setSearch] = useState<string>("");
    const { loading, error, data } = useQuery(SUPPLIERS, {
        variables: { search },
    });

    const [removeSupplier, { loading: removeSupplierLoading }] = useMutation(REMOVE_SUPPLIER, {
        onCompleted: () => message.success("Supplier Deleted Successfully"),
        onError: () => message.error("Something Error!"),
        refetchQueries: [{ query: SUPPLIERS }],
    });

    const [featured] = useMutation(FEATURED, {
        refetchQueries: [{ query: SUPPLIERS }],
    });

    const handleFeatured = async (e: SyntheticEvent, supplierId: string) => {
        e.preventDefault();
        await featured({ variables: { supplierId } });
    };

    const deleteSupplier = (selectedSupplier: any) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this category!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
            showLoaderOnConfirm: true,
        }).then(async (result) => {
            if (result.value) {
                const res = await removeSupplier({
                    variables: { id: selectedSupplier.id },
                });
                if (res.data.removeSupplier) {
                    await deleteS3File(selectedSupplier.logo);
                    await deleteS3File(selectedSupplier.tradeLicense);
                    await deleteS3File(selectedSupplier.listingAgreement);
                }
            }
        });
    };

    const columns = [
        {
            title: "Trade Name",
            dataIndex: "tradeName",
            key: "tradeName",
            ellipsis: true,
        },
        {
            title: "Contact Number",
            key: "contactNumber",
            render: (data: any) => (
                <ContactNumber>
                    <li>
                        <MobileOutlined />
                        <PhoneInput disabled value={data.mobileNumber} containerClass="Supplier__PhoneInput_Display_containerClass" />
                    </li>
                    <li>
                        <PhoneOutlined />
                        <PhoneInput disabled value={data.landlineNumber} containerClass="Supplier__PhoneInput_Display_containerClass" />
                    </li>
                </ContactNumber>
            ),
        },
        {
            title: "Email",
            key: "email",
            ellipsis: true,
            render: (customer: any) => <Typography.Text>{customer.user.email}</Typography.Text>,
        },
        {
            title: "City",
            dataIndex: "city",
            key: "city",
            ellipsis: true,
        },
        {
            title: "Actions",
            key: "operation",
            width: "auto",
            className: "center",
            render: (supplier: any) => (
                <Space size="middle">
                    <Tooltip title="Featured">
                        <Button
                            type="primary"
                            ghost
                            shape="circle"
                            icon={supplier.featured ? <StarFilled /> : <StarOutlined />}
                            size="middle"
                            onClick={(e) => handleFeatured(e, supplier.id)}
                        />
                    </Tooltip>
                    <Tooltip title="View">
                        <Link to={`/suppliers/${supplier.id}`}>
                            <Button type="primary" ghost shape="circle" icon={<EyeOutlined />} size="middle" />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Link to={`/suppliers/${supplier.id}/edit`}>
                            <Button type="primary" ghost shape="circle" icon={<EditOutlined />} size="middle" />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            onClick={() => deleteSupplier(supplier)}
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
                <title>Lumsum | Suppliers</title>
            </Helmet>
            <NewButtonWrapper>
                <Title level={3}>All Supplier</Title>
                <AddNewSupplier />
            </NewButtonWrapper>
            <SearchContainer>
                <Search
                    placeholder="Search for trade name"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={(value) => setSearch(value)}
                />
            </SearchContainer>
            <TableContainer>
                <Table
                    rowKey={(supplier) => supplier.id}
                    loading={loading}
                    sticky={true}
                    dataSource={data?.suppliers}
                    columns={columns}
                    bordered
                    size="small"
                />
            </TableContainer>
        </div>
    );
};

export default Suppliers;

const ContactNumber = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;

    li {
        display: flex;
        align-items: center;

        span {
            margin-left: 5px;
        }
    }
`;

const TableContainer = styled.div`
    th.center,
    td.center {
        text-align: center;
    }

    td {
        /* padding: 8px !important; */
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

const SearchContainer = styled.div`
    margin: 10px auto;
`;
