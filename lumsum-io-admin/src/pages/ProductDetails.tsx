import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { useQuery } from '@apollo/client';
import { Route, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { Button, Typography, Image, Descriptions, Row, Col, Card, Spin, Empty, Divider } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { PRODUCT } from '../graphql/query';
import { Helmet } from 'react-helmet';
import ProductEditModal from '../containers/ProductEditModal';

interface IParams {
    productId: string | undefined
}
const ProductDetails: FC = (props) => {
    const history = useHistory();
    const { path, url } = useRouteMatch();
    const { productId } = useParams<IParams>();
    const { loading, error, data } = useQuery(PRODUCT, {
        variables: { id: productId },
        fetchPolicy: "cache-and-network"
    });

    if (loading)
        return (<Spin />)

    if (error)
        return (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={error.message} />)

    return (
        <>
            <Row>
                <Col span={24}>
                    <Flex>
                        <Typography.Title level={4}>Product Info</Typography.Title>
                        <Button type="primary" shape="round" onClick={() => history.push(`${url}/edit`)}><EditOutlined />Edit</Button>
                    </Flex>
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col flex="auto">
                    <Row>
                        <Col span={12}>
                            <P><span>Id:</span><Id>{data.product.id}</Id></P>
                        </Col>
                        <Col span={12}>
                            <P><span>Name:</span>{data.product.name}</P>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DL>
                                <dt>Description</dt>
                                <dd>{data.product.description}</dd>
                                <dt>Meta Title</dt>
                                <dd>{data.product.metaTitle}</dd>
                                <dt>Meta Description</dt>
                                <dd>{data.product.metaDesc}</dd>
                                <dt>Product Text</dt>
                                <dd
                                    dangerouslySetInnerHTML={{
                                        __html: data.product.productText || "",
                                    }}
                                />
                            </DL>
                        </Col>
                    </Row>
                </Col>
                <Col flex="150px">
                    <ImageWrap>
                        <Image
                            width={150}
                            height={150}
                            src={`${process.env.REACT_APP_IMAGE_URL}${data?.product?.icon}`}
                        />
                        <ImageCaption>ICON</ImageCaption>
                    </ImageWrap>
                </Col>
            </Row>
            <Divider />
            <Descriptions title="Category" />
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col key={data.product.category.id} xs={12} sm={8} lg={8} xl={6}>
                    <StyledCard hoverable cover={
                        <StyledImage
                            alt={data.product.category.name}
                            src={`${process.env.REACT_APP_IMAGE_URL}${data.product.category.icon}`}
                        />
                    }>
                        <StyledCard.Meta
                            title={data.product.category.name}
                            description={data.product.category.desc}
                        />
                    </StyledCard>
                </Col>
            </Row>
            <Route path={`${path}/edit`} children={({ match }) => (
                <ProductEditModal match={match} product={data.product} />
            )} />
        </>
    )
}

export default ProductDetails;

const Id = styled.label`
    background-color: var(--base-color);
    color: #fff;
    padding: 2px 8px;
    border-radius: 4px;
`;

const P = styled.p`
    color: #797979;

    span {
        color: #000;
        font-weight: bold;
        margin-inline-end: 10px;
    }
`;

const DL = styled.dl`
    margin: 0;

    dt {
        color: #000;
        font-weight: bold;
    }
    
    dd {
        margin-inline-start: 15px;
        color: #797979;
    }
`;

const ImageWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 150px;
`;

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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


const ImageCaption = styled.span`
    width: 100%;
    background-color: var(--base-color);
    text-align: center;
    color: #fff;
    font-weight: bold;
`;

const StyledCard = styled(Card)`
    margin-bottom: 15px;
`;

const StyledImage = styled(Image)`

    img {
        height: 150px;
        object-fit: cover;
        object-position: center;
    }
`;