import React, { FC } from 'react';
import styled from 'styled-components/macro';
import ChangePassword from '../containers/ChangePassword';

const Setting: FC = () => {
    return (
        <Container>
            <ChangePassword />
        </Container>
    )
}

export default Setting;

const Container = styled.div`

`;