import { gql, useQuery } from '@apollo/client';
import { Empty, Spin, Comment, Avatar, Tooltip, Rate, Space } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import styled from 'styled-components';

interface ProductsOfSupplierProps {
    supplierId: string | undefined;
}

const REVIEWS_OF_SUPPLIER = gql`
    query getReviewsOfSupplier($id:ID!) {
        getReviewsOfSupplier(id: $id) {
            id
            review
            rating
            reviewBy {
                id
                name
                avatar
            }
        }
    }
`;

const ReviewsOfSupplier: FC<ProductsOfSupplierProps> = ({ supplierId }) => {
    const { data, loading, error } = useQuery(REVIEWS_OF_SUPPLIER, {
        variables: { id: supplierId },
        fetchPolicy: "cache-first"
    })

    if (loading)
        return (<Spin />)

    if (error)
        return (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={error.message} />)

    if (!data.getReviewsOfSupplier.length)
        return (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No review" />)

    console.log(data.getReviewsOfSupplier);

    return (
        <StyledSpace direction="vertical">
            {data.getReviewsOfSupplier.map((review: any) => (
                <StyledComment
                    key={review.id}
                    author={<a>{review.reviewBy.name}</a>}
                    avatar={
                        <Avatar
                            src={getImageUrl(review.reviewBy.avatar)}
                            alt={review.reviewBy.name}
                        >{review.reviewBy.name.slice(0, 1)}</Avatar>
                    }
                    content={
                        <div style={{ background: "#fff" }}>
                            <p>{review.review}</p>
                            <Rate allowHalf disabled defaultValue={review.rating} />
                        </div>
                    }
                    datetime={
                        <Tooltip title={moment('1454521239279').format()}>
                            <span>{moment().fromNow()}</span>
                        </Tooltip>
                    }
                />
            ))}
        </StyledSpace>
    )
}

export default ReviewsOfSupplier;

const StyledComment = styled(Comment)`
    background: #fff;
    border-radius: 8px;
    padding: 0 10px;
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
    margin-bottom: 15px;
`;

const StyledSpace = styled(Space)`
    width: 100%;
`;

const getImageUrl = (url: string): string => {
    if (new RegExp("https://").test(url) || new RegExp("http://").test(url))
        return url;
    return `${process.env.REACT_APP_IMAGE_URL}${url}`;
}