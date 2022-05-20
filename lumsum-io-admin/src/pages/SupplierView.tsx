import { useQuery } from "@apollo/client";
import { Button, Col, Divider, Empty, Row, Spin, Typography, Image } from "antd";
import React, { FC } from "react";
import { Route, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { SUPPLIER } from "../graphql/query";
import ProductsOfSupplier from "../containers/ProductsOfSuppliers";
import ReviewsOfSupplier from "../containers/ReviewsOfSupplier";
import SupplierImages from "../containers/SupplierImages";
import styled from "styled-components";
import SupplierEditModal from "../containers/SupplierEditModal";
import SupplierProductsEditModal from "../containers/SupplierProductsEditModal";
import { EditOutlined } from "@ant-design/icons";
import PhoneInput from "react-phone-input-2";
import SocialLogo from "../components/SocialLogo";
import { ReactComponent as FacebookLogo } from "../assets/svg/facebook-f-brands.svg";
import { ReactComponent as InstragramLogo } from "../assets/svg/instagram-brands.svg";
import { ReactComponent as YoutubeLogo } from "../assets/svg/youtube-brands.svg";
import { ReactComponent as LocationLogo } from "../assets/svg/map-marker-alt-solid.svg";
import AddNewSupplierImage from "../components/AddNewSupplierImage";

interface IParams {
    supplierId: string | undefined;
}

const SupplierView: FC = () => {
    const history = useHistory();
    const { path, url } = useRouteMatch();
    const { supplierId } = useParams<IParams>();
    const { data, loading, error, refetch } = useQuery(SUPPLIER, {
        variables: { id: supplierId },
        fetchPolicy: "cache-and-network",
    });

    if (loading) return <Spin />;

    if (error) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={error.message} />;

    const fetchingHandler = () => {
        refetch();
    };

    return (
        <>
            <Row>
                <Col span={24}>
                    <Flex>
                        <Typography.Title level={4}>Supplier Info</Typography.Title>
                        <Button type="primary" shape="round" onClick={() => history.push(`${url}/edit/info`)}>
                            <EditOutlined />
                            Edit
                        </Button>
                    </Flex>
                </Col>
            </Row>
            <MarginTop />
            <Row>
                <Col flex="auto">
                    <Row>
                        <Col span={12}>
                            <P>
                                <span>Id:</span>
                                <Id>{data.supplier.id}</Id>
                            </P>
                        </Col>
                        <Col span={12}>
                            <P>
                                <span>Trade Name:</span>
                                {data.supplier.tradeName}
                            </P>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <P>
                                <span>Legal Name:</span>
                                {data.supplier.legalName}
                            </P>
                        </Col>
                        <Col span={12}>
                            <P>
                                <span>Contact Person:</span>
                                {data.supplier.contactPerson}
                            </P>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <P>
                                <span>Landline No.:</span>
                                <PhoneInput
                                    disabled
                                    value={data.supplier.landlineNumber}
                                    placeholder=""
                                    containerClass="Supplier__PhoneInput_Display_containerClass"
                                />
                            </P>
                        </Col>
                        <Col span={12}>
                            <P>
                                <span>Mobile No.:</span>
                                <PhoneInput
                                    disabled
                                    placeholder=""
                                    value={data.supplier.mobileNumber}
                                    containerClass="Supplier__PhoneInput_Display_containerClass"
                                />
                            </P>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <P>
                                <span>Address:</span>
                                <LocationLogo />
                                {data.supplier.city}, {data.supplier.areaWithInCity}
                            </P>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <P>
                                <span>Trade License:</span>
                                {data?.supplier?.tradeLicense && (
                                    <CustomLink href={`${process.env.REACT_APP_IMAGE_URL}${data?.supplier?.tradeLicense}`}>view</CustomLink>
                                )}
                            </P>
                        </Col>
                        <Col span={12}>
                            <P>
                                <span>Listing Argeement:</span>
                                {data?.supplier?.listingAgreement && (
                                    <CustomLink href={`${process.env.REACT_APP_IMAGE_URL}${data?.supplier?.listingAgreement}`}>
                                        view
                                    </CustomLink>
                                )}
                            </P>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <P>
                                <span>Website:</span>
                                {data?.supplier?.website && (
                                    <CustomLink href={`${process.env.REACT_APP_IMAGE_URL}${data?.supplier?.website}`}>view</CustomLink>
                                )}
                            </P>
                        </Col>
                        <Col span={12}></Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DL>
                                <dt>Social</dt>
                                <dd>
                                    <SocialLogo.Container>
                                        {data.supplier.facebook && (
                                            <SocialLogo href={data.supplier.facebook} target="_blank" color="#3b5998">
                                                <FacebookLogo />
                                            </SocialLogo>
                                        )}
                                        {data.supplier.linkdin && (
                                            <SocialLogo href={data.supplier.linkdin} target="_blank" color="#3f729b">
                                                <InstragramLogo />
                                            </SocialLogo>
                                        )}
                                        {data.supplier.youtube && (
                                            <SocialLogo href={data.supplier.youtube} target="_blank" color="#282828">
                                                <YoutubeLogo />
                                            </SocialLogo>
                                        )}
                                        {data.supplier.location && (
                                            <SocialLogo href={data.supplier.location} target="_blank" color="#db3236">
                                                <LocationLogo />
                                            </SocialLogo>
                                        )}
                                    </SocialLogo.Container>
                                </dd>
                                <dt>About</dt>
                                <dd>{data.supplier.about}</dd>
                            </DL>
                        </Col>
                    </Row>
                </Col>
                <Col flex="150px">
                    <ImageWrap>
                        <Image width={150} height={150} src={`${process.env.REACT_APP_IMAGE_URL}${data?.supplier?.logo}`} />
                        <ImageCaption>LOGO</ImageCaption>
                    </ImageWrap>
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col span={24}>
                    <Flex>
                        <Typography.Title level={4}>Images</Typography.Title>
                        {data?.supplier?.images.length < 5 && (
                            <AddNewSupplierImage
                                supplierId={supplierId}
                                maxImages={5 - data?.supplier?.images.length}
                                onUploadFinish={fetchingHandler}
                            />
                        )}
                    </Flex>
                </Col>
            </Row>
            <MarginTop />
            <SupplierImages onDeleteFinish={fetchingHandler} loading={loading} images={data?.supplier?.images} />
            <Divider />
            <Row>
                <Col span={24}>
                    <Flex>
                        <Typography.Title level={4}>Products</Typography.Title>
                        <Button type="primary" shape="round" onClick={() => history.push(`${url}/edit/products`)}>
                            <EditOutlined />
                            Edit
                        </Button>
                    </Flex>
                </Col>
            </Row>
            <MarginTop />
            {supplierId && <ProductsOfSupplier supplierId={supplierId} />}
            <Divider />
            <Row>
                <Col span={24}>
                    <Flex>
                        <Typography.Title level={4}>Reviews</Typography.Title>
                    </Flex>
                </Col>
            </Row>
            <MarginTop />
            <ReviewsOfSupplier supplierId={supplierId} />
            <MarginTop value={20} />
            <Route path={`${path}/edit/info`} children={({ match }) => <SupplierEditModal match={match} supplier={data.supplier} />} />
            <Route
                path={`${path}/edit/products`}
                children={({ match }) => <SupplierProductsEditModal match={match} supplier={data.supplier} />}
            />
        </>
    );
};

export default SupplierView;

const CustomLink = styled.a.attrs({
    target: "_blank",
})`
    text-decoration: none;
    color: var(--base-color);

    &:hover {
        color: var(--base-color);
        text-decoration: underline;
    }
`;

const MarginTop = styled.p<{ value?: number }>`
    margin-top: ${({ value }) => value}px;
`;

MarginTop.defaultProps = {
    value: 10,
};

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Id = styled.label`
    background-color: var(--base-color);
    color: #fff;
    padding: 2px 8px;
    border-radius: 4px;
`;

const P = styled.p`
    color: #797979;
    display: flex;
    align-items: center;

    span {
        color: #000;
        font-weight: bold;
        margin-inline-end: 10px;
    }

    svg {
        color: #797979;
        height: 12px;
        width: 12px;
        margin-right: 5px;
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
