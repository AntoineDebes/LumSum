import { gql, useMutation, useQuery } from "@apollo/client";
import { Row, Col, Card, Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import React, { FC } from "react";
import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";
import { deleteS3File } from "../../utils";

const BLOGS = gql`
    query {
        blogs {
            id
            slug
            title
            body
            cover
            thumbnail
        }
    }
`;

const REMOVE_BLOG = gql`
    mutation removeBlog($id: ID!) {
        removeBlog(id: $id)
    }
`;

const Blogs: FC = () => {
    const { loading, data } = useQuery(BLOGS, {
        fetchPolicy: "cache-and-network",
    });
    const [removeBlog] = useMutation(REMOVE_BLOG, {
        refetchQueries: [{ query: BLOGS }],
    });

    const deleteBlogHandler = async (event: React.MouseEvent<HTMLElement>, id: string) => {
        event.preventDefault();
        const selectedBlog = data.blogs.find((blog: any) => blog.id === id);
        const res = await removeBlog({ variables: { id: selectedBlog.id } });
        if (res.data.removeBlog) {
            await deleteS3File(selectedBlog.cover);
            await deleteS3File(selectedBlog.thumbnail);
        }
    };

    if (loading) return <div>Loading..</div>;
    return (
        <Container>
            <Row gutter={[16, 16]}>
                {data.blogs.map((d: any, k: number) => (
                    <Col span={8} key={k}>
                        <StyledLink to={`/blogs/${d.id}`}>
                            <Card
                                hoverable
                                cover={
                                    <CoverWrap>
                                        <CoverImage src={d.cover ? `${process.env.REACT_APP_IMAGE_URL}${d.cover}` : undefined} />
                                        <Tooltip title="Delete" placement="left">
                                            <Button
                                                type="primary"
                                                shape="circle"
                                                icon={<DeleteOutlined />}
                                                onClick={(event) => deleteBlogHandler(event, d.id)}
                                            />
                                        </Tooltip>
                                    </CoverWrap>
                                }
                            >
                                <MetaTitle title={d.title} />
                            </Card>
                        </StyledLink>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Blogs;

const StyledLink = styled(Link)`
    width: 100%;
    text-decoration: none;
` as React.ComponentType<LinkProps>;

const Container = styled.div`
    margin: 15px auto;
`;

const MetaTitle = styled(Meta)`
    & .ant-card-meta-title {
        text-align: center;
    }
`;

const CoverWrap = styled.div`
    height: 200px;
    position: relative;

    button {
        position: absolute !important;
        right: 10px !important;
        top: 10px !important;
        background: red !important;
        border-color: red !important;
    }
`;

const CoverImage = styled.img.attrs((props) => ({
    alt: "cover",
    src: props.src,
}))`
    height: 200px;
    object-fit: cover;
    object-position: center;
`;

CoverImage.defaultProps = {
    src: "/no-cover.jpg",
};
