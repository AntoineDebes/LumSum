import React, { FC, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button as AntdButton, Table, Typography, Image, Tooltip, Space, message, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components/macro';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory, Link, Route, useRouteMatch } from 'react-router-dom';
import Swal from 'sweetalert2';
import usePrepareLink from '../../hooks/usePrepareLink';
import { CATEGORIES } from '../../graphql/query';
import { DELETE_CATEGORY } from '../../graphql/mutation';
import { IMAGE_URL } from '../../constants/constant';
import AddNewCategory from './AddNewCategory';
import CategoryList from './CategoryList';
import AddNewCategoryModal from './AddNewCategoryModal';



const Categories: FC = () => {
    const { path, url } = useRouteMatch();
    const history = useHistory();
    const likesLink = usePrepareLink({
        to: "/likes/asdhdssd",
        isRelativePath: true
    });
    const { loading, error, data } = useQuery(CATEGORIES, {
        fetchPolicy: "cache-and-network"
    })
    const [removeCategory] = useMutation(DELETE_CATEGORY, {
        onCompleted: () => message.success("Category successfully deleted"),
        onError: () => message.error("Something Error!")
    });

    const deleteCategory = (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this category!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                removeCategory({
                    variables: { id },
                    update: (caches: any, { data: updateData }) => {
                        const prevData = caches.readQuery({ query: CATEGORIES });
                        let categories = prevData.categories;
                        categories = categories.filter((category: any) => category.id !== id);
                        caches.writeQuery({ query: CATEGORIES, data: { categories } });
                    }
                })
            }
        })
    }

    const columns = [
        {
            title: 'Icon',
            key: 'image',
            width: '150px',
            render: (category: any) => {
                return <Image
                    width={100}
                    src={`${IMAGE_URL}${category.image}`}
                />
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true
        },
        {
            title: 'Actions',
            key: 'operation',
            width: '200px',
            render: (category: any) => (
                <Space size="middle">
                    <Tooltip title="View">
                        <Button onClick={() => history.push(`/categories/${category.id}`)} type="primary" ghost shape="circle" icon={<EyeOutlined />} size="middle" />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button type="primary" ghost shape="circle" icon={<EditOutlined />} size="middle" />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button value={category.id} onClick={() => deleteCategory(category.id)} type="primary" ghost shape="circle" icon={<DeleteOutlined />} size="middle" />
                    </Tooltip>
                </Space>
            ),
        }
    ];

    return (
        <div>
            <Helmet>
                <title>Lumsum | Categories</title>
            </Helmet>
            <AddNewCategory />
            <CategoryList />
            <Route
                exact
                path={`${path}/new`}
                children={(props) => <AddNewCategoryModal {...props} />}
            />
            <Route
                // path={likesLink.pathname}
                exact
                path="/categories/:id"
                children={(props) => {
                    console.log(props);
                    return (
                        <Modal
                            visible={Boolean(props.match)}
                            title="Add New Category"
                            onOk={history.goBack}
                            onCancel={history.goBack}
                        >
                            <h1>Hello categories</h1>
                        </Modal>
                    );
                }}
            />
            <Route
                // path={likesLink.pathname}
                exact
                path="/categories/:id/edit"
                children={(props) => {
                    console.log(props);
                    return (
                        <Modal
                            visible={Boolean(props.match)}
                            title="Add New Category"
                            onOk={history.goBack}
                            onCancel={history.goBack}
                        >
                            <h1>Hello</h1>
                        </Modal>
                    );
                }}
            />
        </div>
    )
}

export default Categories;

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