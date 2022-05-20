import React, { FC, Fragment } from 'react';
import { Button as AntdButton, Typography, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components/macro';
import { Link, useRouteMatch } from 'react-router-dom';

const AddNewCategory: FC = () => {
    const { url } = useRouteMatch();
    return (
        <Fragment>
            <NewButtonWrapper>
                <Title level={3}>All Categories</Title>
                <Tooltip placement="left" title="Add New Category">
                    <Link to={`${url}/new`}>
                        <Button
                            type="primary"
                            shape="round"
                            icon={<PlusOutlined />}
                            size="large"
                        >New</Button>
                    </Link>
                </Tooltip>
            </NewButtonWrapper>
        </Fragment>
    )
}

export default AddNewCategory;

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