import React, {FC} from "react";
import {
    Button as AntdButton,
    Typography,
    Image,
    Descriptions,
    Spin,
    Empty,
    Row,
    Col,
    Card,
    Divider,
} from "antd";
import {EditOutlined} from "@ant-design/icons";
import styled from "styled-components/macro";
import {useQuery} from "@apollo/client";
import {Route, useHistory, useParams, useRouteMatch} from "react-router-dom";
import {CATEGORY} from "../graphql/query";
import {Helmet} from "react-helmet";
import CategoryEditModal from "../containers/CategoryEditModal";
import {getFallbackImg} from "../utils";

const CategoryDetails: FC = () => {
    const history = useHistory();
    const {path, url} = useRouteMatch();
    const {categoryId} = useParams<{ categoryId: string }>();

    const {loading, data, error} = useQuery(CATEGORY, {
        variables: {id: categoryId},
        fetchPolicy: "cache-and-network",
    });

    if (loading) return <Spin/>;

    if (error)
        return (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={error.message}/>
        );

    return (
        <>
            <Helmet></Helmet>
            <Row>
                <Col span={24}>
                    <Flex>
                        <Typography.Title level={4}>Category Info</Typography.Title>
                        <Button
                            type="primary"
                            shape="round"
                            onClick={() => history.push(`${url}/edit`)}
                        >
                            <EditOutlined/>
                            Edit
                        </Button>
                    </Flex>
                </Col>
            </Row>
            <Divider/>
            <Row>
                <Col flex="auto">
                    <Row>
                        <Col span={12}>
                            <P>
                                <span>Id:</span>
                                <Id>{data.category.id}</Id>
                            </P>
                        </Col>
                        <Col span={12}>
                            <P>
                                <span>Name:</span>
                                {data.category.name}
                            </P>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DL>
                                <dt>Description</dt>
                                <dd>{data.category.desc}</dd>
                                <dt>Meta Title</dt>
                                <dd>{data.category.metaTitle}</dd>
                                <dt>Meta Description</dt>
                                <dd>{data.category.metaDesc}</dd>
                                <dt>Category Text</dt>
                                <dd
                                    dangerouslySetInnerHTML={{
                                        __html: data.category.categoryText || "",
                                    }}
                                />
                            </DL>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <ImageWrap>
                            <Image
                                width={150}
                                height={150}
                                src={`${process.env.REACT_APP_IMAGE_URL}${data?.category?.icon}`}
                            />
                            <ImageCaption>ICON</ImageCaption>
                        </ImageWrap>
                    </Row>
                    <Divider/>
                    <Row>
                        <ImageWrap>
                            <Image
                                src={`${process.env.REACT_APP_IMAGE_URL}${data?.category?.banner}`}
                                fallback={getFallbackImg()}
                            />
                            <ImageCaption>Banner</ImageCaption>
                        </ImageWrap>
                    </Row>
                    <Divider/>
                    <Row>
                        <ImageWrap>
                            <Image
                                src={`${process.env.REACT_APP_IMAGE_URL}${data?.category?.bannerMobile}`}
                                fallback={getFallbackImg()}
                            />
                            <ImageCaption>Banner Mobile</ImageCaption>
                        </ImageWrap>
                    </Row>
                    <Divider/>
                    <Row>
                        <P>
                            <span>Banner URL:</span>
                            {data.category.bannerUrl}
                        </P>
                    </Row>
                    <Row>
                        <P>
                            <span>Banner active:</span>
                            {data.category.bannerActive === true ? 'true': 'false'}
                        </P>
                    </Row>
                </Col>
            </Row>
            <Divider/>
            <Descriptions title="Products"/>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                {data.category.products.map((product: any) => (
                    <Col key={product.id} xs={12} sm={8} lg={8} xl={6}>
                        <StyledCard
                            hoverable
                            cover={
                                <StyledImage
                                    alt={product.name}
                                    src={`${process.env.REACT_APP_IMAGE_URL}${product.icon}`}
                                />
                            }
                        >
                            <StyledCard.Meta
                                title={product.name}
                                description={product.desc}
                            />
                        </StyledCard>
                    </Col>
                ))}
            </Row>
            <Route
                path={`${path}/edit`}
                children={({match}) => (
                    <CategoryEditModal match={match} category={data.category}/>
                )}
            />
        </>
    );
};

export default CategoryDetails;

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

const ImageCaption = styled.span`
  width: 100%;
  background-color: var(--base-color);
  text-align: center;
  color: #fff;
  font-weight: bold;
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

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    margin: 0;
  }
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
