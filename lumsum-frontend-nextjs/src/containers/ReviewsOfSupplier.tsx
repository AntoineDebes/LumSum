import { useQuery } from '@apollo/react-hooks';
import { Empty, Spin, Comment, Avatar, Tooltip, Rate, Space } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import REVIEWS_OF_SUPPLIER from '../graphql/reviews-of-supplier.query';

const ReviewsOfSupplier: FC = () => {
    const router = useRouter()
    const { supplier } = router.query;
    const { data, loading, error } = useQuery(REVIEWS_OF_SUPPLIER, {
        variables: { id: supplier },
        fetchPolicy: "cache-and-network"
    })

    if (loading)
        return (<Spin />)

    if (error)
        return (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={error.message} />)
    if (!data.getReviewsOfSupplier.length)
        return (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No review" />)

    console.log(data.getReviewsOfSupplier);

    return (
        <Space direction="vertical">
            {data.getReviewsOfSupplier.map((review: any) => (
                <Comment
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
                            <Rate disabled defaultValue={review.rating} />
                        </div>
                    }
                    datetime={
                        <Tooltip title={moment(parseInt(review.createAt)).format('L')}>
                            <span>{review.createAt}</span>
                        </Tooltip>
                    }
                />
            ))}
        </Space>
    )
}

export default ReviewsOfSupplier;

const getImageUrl = (url: string): string => {
    if (new RegExp("https//").test(url) || new RegExp("http//").test(url))
        return url;
    return `${process.env.UPLOAD_URL}${url}`;
}

// const StyledComment = styled(Comment)`
//     background: #fff;
//     border-radius: 8px;
//     padding: 0 10px;
//     box-shadow: 0 0 2px rgba(0,0,0,0.2);
//     margin-bottom: 15px;
// `;

// const StyledSpace = styled(Space)`
//     width: 100%;
// `;