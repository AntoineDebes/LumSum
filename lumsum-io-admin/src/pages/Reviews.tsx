import React, { FC, useState } from 'react';
import { Button as AntdButton, Table, Typography, Image, Tooltip, Space, message, Rate } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components/macro';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import { REVIEWS } from '../graphql/query';
import { DELETE_REVIEW } from '../graphql/mutation';
import { Helmet } from 'react-helmet';

const Reviews: FC = () => {
    const history = useHistory();
    const { loading, error, data } = useQuery(REVIEWS, {
        fetchPolicy: "cache-and-network"
    })
    const [removeReview] = useMutation(DELETE_REVIEW, {
        onCompleted: () => message.success("Review successfully deleted"),
        onError: () => message.error("Something Error!"),
        refetchQueries: [
            { query: REVIEWS }
        ]
    });

    const deleteReview = (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                removeReview({
                    variables: { id }
                })
            }
        })
    }

    const columns = [
        {
            title: 'Review By',
            key: 'reviewBy',
            ellipsis: true,
            render: (review: any) => {
                return <span>{review.reviewBy.name}</span>
            }
        },
        {
            title: 'Review On',
            key: 'reviewOn',
            ellipsis: true,
            render: (review: any) => {
                return <span>{review.reviewOn.tradeName}</span>
            }
        },
        {
            title: 'Review',
            dataIndex: 'review',
            key: 'review',
            ellipsis: true
        },
        {
            title: 'Rating',
            key: 'rating',
            render: (review: any) => {
                return <Rate allowHalf disabled defaultValue={review.rating} />
            }
        },
        {
            title: 'Actions',
            key: 'operation',
            width: '100px',
            className: 'center',
            render: (review: any) => (
                <Space size="middle">
                    <Tooltip title="Delete">
                        <Button value={review.id} onClick={() => deleteReview(review.id)} type="primary" ghost shape="circle" icon={<DeleteOutlined />} size="middle" />
                    </Tooltip>
                </Space>
            ),
        }
    ];

    return (
        <div>
            <Helmet>
                <title>Lumsum | Reviews</title>
            </Helmet>
            <NewButtonWrapper>
                <Title level={3}>All Reviews</Title>
            </NewButtonWrapper>
            <TableContainer>
                <Table
                    rowKey={review => review.id}
                    loading={loading}
                    sticky={true}
                    dataSource={data?.reviews}
                    columns={columns}
                    bordered
                />
            </TableContainer>
        </div>
    )
}

export default Reviews;

const TableContainer = styled.div`
    
    table {

        th.center, td.center {
            text-align: center;
        }
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