import React, { FC } from 'react';
import { Card as AntdCard, Col, Row, Typography } from 'antd';
import styled from 'styled-components/macro';
import Count from 'react-countup';
import { COUNTS } from '../graphql/query';
import { useQuery } from '@apollo/client';

const Counts: FC = () => {
    const { data } = useQuery(COUNTS, {
        fetchPolicy: "cache-and-network"
    });
    if (!data)
        return (<></>)
    return (
        <Row>
            <Col span={6}>
                <Card bordered={true} className="left">
                    <CountUp start={0} delay={2} end={data?.counts?.users} />
                    <Typography.Text>Users</Typography.Text>
                </Card>
            </Col>
            <Col span={6}>
                <Card bordered={false}>
                    <CountUp start={0} delay={2} end={data?.counts?.suppliers} />
                    <Typography.Text>Suppliers</Typography.Text>
                </Card>
            </Col>
            <Col span={6}>
                <Card bordered={false}>
                    <CountUp start={0} delay={2} end={data?.counts?.products} />
                    <Typography.Text>Products</Typography.Text>
                </Card>
            </Col>
            <Col span={6}>
                <Card bordered={false} className="right">
                    <CountUp start={0} delay={2} end={data?.counts?.reviews} />
                    <Typography.Text>Reviews</Typography.Text>
                </Card>
            </Col>
        </Row>
    )
}

export default Counts;

const Card = styled(AntdCard)`
    margin: 10px;
    border: 1px solid var(--base-color);

    &.left {
        margin-left: 0;
    }

    &.right {
        margin-right: 0;
    }

    & > .ant-card-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

const CountUp = styled(Count)`
    font-size: 32px;
    text-align: center;
`;