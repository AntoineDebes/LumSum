import React, { FC } from 'react';
import styled from 'styled-components/macro';

interface CompoundComponentProps {
    Container: FC;
}

const SocialLogoWrapper: FC<any> & CompoundComponentProps = ({ children, color, ...restProps }) => {
    return (
        <Link {...restProps}>
            <Wrapper color={color}>{children}</Wrapper>
        </Link>
    )
}

SocialLogoWrapper.Container = ({ children }) => <Container>{children}</Container>;

export default SocialLogoWrapper;

export const Link = styled.a`
    text-decoration: none;
    // overflow: auto;
`;

export const Wrapper = styled.div<{ color: string }>`
    overflow: hidden;
    background-color: ${({ color }) => color};
    border-radius: 50%;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    transform: scale(1);
    transition: transform 0.1s ease-in-out 0.1s;

    &:hover {
        transform: scale(1.05);
    }

    svg {
        color: #ffffff;
        height: 16px;
        width: 16px;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 5px;
`;