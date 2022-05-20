import React, { FC } from 'react';
import styled from "styled-components/macro";
import { Layout } from 'antd';
import Header from './components/Header';
import SideMenu from './components/SideMenu';

const FeedLayout: FC = ({ children }) => {
    return (
        <MainLayout>
            <SideMenu />
            <BodyLayout>
                <Header />
                <StyledContent>{children}</StyledContent>
                {/* <Footer>Footer</Footer> */}
            </BodyLayout>
        </MainLayout>
    )
}

export default FeedLayout;

const MainLayout = styled(Layout)`
    height: 100vh;
    width: 100vw;
`;

const BodyLayout = styled(Layout)`
    margin-left: 200px;
`;

const StyledContent = styled(Layout.Content)`
    padding: 15px;
`;