import { Divider, Empty, Rate, Spin, Table, Typography } from 'antd';
import React, { FC } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import styles from '../styles/ReviewsOfCustomer.module.scss';

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

const ReviewsOfCustomer: FC = () => {
    let count = 1;
    const { data, loading, error } = useQuery(GET_REVIEWS_AS_CUSTOMER, {
        fetchPolicy: "cache-and-network"
    });

    if (error)
        return (<Empty />)

    const columns = [
        // {
        //     title: '#',
        //     key: '#',
        //     render: (review: any) => {
        //         return <span>{count++}</span>
        //     }
        // },
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
                return (
                    <div className={styles.rateWrap}>
                        <span className={styles.rateNumber}>{review.rating}</span>
                        <Rate disabled defaultValue={review.rating} className="customer-review" />
                    </div>
                )
            }
        },
    ];

    return (
        <div className="container">
            <Divider orientation="left" plain>
                <Typography.Title level={5}>Reviews</Typography.Title>
            </Divider>
            <Table
                loading={loading}
                dataSource={data?.getReviewsAsCustomer}
                columns={columns}
            />
        </div>
    )
}

export default ReviewsOfCustomer;
