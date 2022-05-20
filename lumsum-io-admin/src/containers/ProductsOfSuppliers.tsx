import { gql, useQuery } from '@apollo/client';
import { Card, Col, Empty, Row, Spin, Image } from 'antd';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const PRODUCT_OF_SUPPLIER = gql`
    query getProductsOfSupplier($id: ID!) {
        getProductsOfSupplier(id: $id) {
            id
            name
            description
            icon
        }
    }
`;

interface IParams {
    supplierId: string | undefined;
}

const ProductsOfSupplier: FC<{supplierId:string}> = ({supplierId }) => {
    // const { supplierId } = useParams<IParams>();
    console.log({supplierId})
    const { data, loading, error } = useQuery(PRODUCT_OF_SUPPLIER, {
        variables: { id: supplierId },
        fetchPolicy: "cache-and-network"
    })

    if (loading)
        return (<Spin />)

    if (error)
        return (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={error.message} />)

    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {data.getProductsOfSupplier.map((product: any) => (
                <Col key={product.id} xs={12} sm={8} lg={8} xl={6}>
                    <StyledCard hoverable cover={
                        <StyledImage
                            alt={product.name}
                            src={`${process.env.REACT_APP_IMAGE_URL}${product.icon}`}
                        />
                    }>
                        <StyledCard.Meta
                            title={product.name}
                            
                        />
                    </StyledCard>
                </Col>
            ))}
        </Row>
    )
}

export default ProductsOfSupplier;

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