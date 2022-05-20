import styled from "styled-components";
import Container from "@/components/Container/Container";
import { Layout, Input as AntDInput } from "antd";

const { Footer: AntDFooter } = Layout;

export const FooterContainer = styled(Container)`
  padding: 4.5rem 1rem;
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: 25rem 1fr;
  align-items: flex-start;
  @media (max-width: 1264px) {
    grid-template-columns: 1fr;
    grid-gap: 2rem;
    padding: 3.5rem 1rem;
  }
  @media (max-width: 640px) {
    padding: 1.5rem 1rem;
  }
`;

export const LeftBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 560px) {
    align-items: center;
    text-align: center;
  }
`;
export const Logo = styled.a`
  display: flex;
`;
export const LogoImgWrap = styled.div`
  position: relative;
  width: 4.5rem;
  height: 4.5rem;
  @media (max-width: 560px) {
    width: 3.5rem;
    height: 3.5rem;
  }
`;
export const Text = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin: 1.5rem 0 0;
  @media (max-width: 560px) {
    margin-top: 1rem;
  }
`;

export const RightBlock = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 0.875rem;
  gap: 2rem;
  @media (max-width: 1080px) {
    gap: 2rem;
  }
  @media (max-width: 1024px) {
    /* justify-content: space-between; */
    gap: 3rem;
  }
  @media (max-width: 832px) {
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 3rem 4rem;
  }
  @media (max-width: 560px) {
    gap: 1.75rem;
  }
`;
export const LinkGroup = styled.div`
  &:last-child {
    min-width: 240px;
  }
  @media (max-width: 560px) {
    flex: 1;
    flex-basis: 100%;
    text-align: center;
  }
`;
export const LinkHeader = styled.h5`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;
  margin-bottom: 2em;

  @media (max-width: 560px) {
    margin-bottom: 0.75em;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
export const LinkList = styled.ul`
  margin-bottom: 0;
`;
export const LinkLi = styled.li`
  margin-bottom: 2em;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 560px) {
    margin-bottom: 0.75em;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
export const LinkA = styled.a`
  white-space: nowrap;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ListLinearContactInfo = styled.ul`
  font-size: 1.5rem;
  margin-bottom: 1em;
  display: flex;
  @media (max-width: 560px) {
    justify-content: center;
  }
`;

export const ListLinearLiContactInfo = styled.li`
  margin-right: 0.25em;
`;

export const ListLinearIconWrapContactInfo = styled.div`
  position: relative;
  width: 1.2em;
  height: 1.2em;
  border-radius: 50%;
  overflow: hidden;
`;

export const Footer = styled(AntDFooter)`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  padding: 0;
  position: relative;
  z-index: 5;

  @media (max-width: 1080px) {
    grid-gap: 3rem;
  }
`;

export const SubscribeForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const inputFields = styled(AntDInput)`
  font-size: 0.75rem;
  width: 100%;
  border-color: ${({ theme }) => theme.colors.borderColorDarker2};
  /* margin-right: 1em; */
`;
