import { useQuery } from '@apollo/client';
import { Button, Col, Descriptions, Empty, Row, Space, Spin, Typography, Image } from 'antd';
import React, { FC } from 'react';
import { Route, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { USER } from '../graphql/query';
import styled from 'styled-components';
import CustomerEditModal from '../containers/CustomerEditModal';
import ReviewsOfCustomer from '../containers/ReviewsOfCustomers';

interface IParams {
    userId: string | undefined;
}

const SupplierView: FC = () => {
    const history = useHistory();
    const { path, url } = useRouteMatch();
    const { userId } = useParams<IParams>();
    const { data, loading, error } = useQuery(USER, {
        variables: { id: userId },
        fetchPolicy: "cache-and-network"
    })

    if (loading)
        return (<Spin />)

    if (error)
        return (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={error.message} />)

    return (
        <>
            <Descriptions title={
                <Flex>
                    <Typography.Title level={4}>User Info</Typography.Title>
                    <Button type="primary" shape="round" onClick={() => history.push(`${url}/edit`)}>Edit</Button>
                </Flex>
            } />
            <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                <Col flex="auto">
                    <Space>
                        <ul>
                            <li><span>Name: </span>{data.user.name}</li>
                            <li><span>Email: </span>{data.user.user.email}</li>
                        </ul>
                    </Space>
                </Col>
                <Col flex="320px">
                    <Space>
                        <ImageWrapper>
                            <Image src={`${process.env.REACT_APP_IMAGE_URL}${data.user.avatar}` || "/assets/images/no-image-available.jpg"} />
                        </ImageWrapper>
                    </Space>
                </Col>
            </Row>
            {/* <ReviewsOfCustomer /> */}
            <Route path={`${path}/edit`} children={({ match }) => (
                <CustomerEditModal match={match} user={data.user} />
            )} />
        </>
    )
}

export default SupplierView;

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ImageWrapper = styled.div`
    width: 160px;

    img {
        width: 160px;
        height: 160px;
        object-fit: cover;
        object-position: center;
        border: 1px solid var(--base-color);
    }

    button {
        width: 100%;
    }
`;