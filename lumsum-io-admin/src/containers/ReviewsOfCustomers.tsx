import { Divider, Empty, Rate, Spin, Table, Typography } from 'antd';
import React, { FC } from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

const GET_REVIEWS_AS_CUSTOMER = gql`
    query getReviewsAsCustomer {
        getReviewsAsCustomer {
            id
            review
            rating
            reviewOn {
                id
                tradeName
            }
        }
    }
`
let count = 1;
const ReviewsOfCustomer: FC = () => {
    const { data, loading, error } = useQuery(GET_REVIEWS_AS_CUSTOMER);

    if (error)
        return (<Empty />)

    const columns = [
        {
            title: '#',
            key: '#',
            render: (review: any) => {
                return <span>{count++}</span>
            }
        },
        {
            title: 'Company Name',
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
        },
        {
            title: 'Rating',
            key: 'rating',
            render: (review: any) => {
                return <Rate disabled defaultValue={review.rating} />
            }
        },
    ];

    return (
        <Container>
            <Divider orientation="left" plain>
                <Typography.Title level={5}>Reviews</Typography.Title>
            </Divider>
            <Table
                loading={loading}
                dataSource={data?.getReviewsAsCustomer}
                columns={columns}
            />
        </Container>
    )
}

export default ReviewsOfCustomer;

const Container = styled.div`
    width: 100%;
`;