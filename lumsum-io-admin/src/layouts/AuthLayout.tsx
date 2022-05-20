import React, { FC } from 'react';
import styled from 'styled-components/macro';

const AuthLayout: FC = ({ children }) => {
    return (
        <Container>{children}</Container>
    )
}

export default AuthLayout;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;