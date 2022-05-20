import styled from "styled-components";
import { Button } from "antd";

interface DropdownButtonProps {
  maxwidth?: string;
  minwidth?: string;
  color?: string;
}

export const DropdownWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.25rem;
`;

export const DropdownButton = styled(Button)<DropdownButtonProps>`
  font-size: 1em;
  font-weight: 700;
  background: transparent;
  height: unset;
  padding: 0.125rem 0.375rem;
  border: none;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & span:first-child {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: ${(props) => (props.maxwidth ? props.maxwidth : "initial")};
    min-width: ${(props) => (props.minwidth ? props.minwidth : "initial")};
  }
`;

export const DropdownLabel = styled.small`
  color: ${(props) => (props.color ? props.color : "#848484")};
  font-size: 0.875em;
  line-height: 1;
  padding: 0.125rem 0.375rem;

  @media (max-width: 660px) {
    display: none;
  }
`;

export const DropdownButtonText = styled.h6`
  font-size: 1rem;
  @media (max-width: 660px) {
    display: none;
  }
`;

export const NavCart = styled.nav`
  margin-left: 2.25rem;

  @media (max-width: 620px) {
    margin-left: 1.25rem;
  }
`;

export const NavAccount = styled.nav``;

export const NavIconMenu = styled.a`
  display: flex;
  align-items: center;
`;

export const NavIconWrap = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;

  @media (max-width: 767px) {
    width: 1.875rem;
    height: 1.875rem;
  }
`;

export const NavIconText = styled.span`
  font-weight: 700;
  margin-right: 0.5rem;

  @media (max-width: 560px) {
    display: none;
  }
`;

export const NavIconWrap2 = styled(NavIconWrap)`
  display: none;
  @media (max-width: 660px) {
    display: block;
  }
`;

interface SCAnchorProps {
  center?: boolean;
}
export const SCAnchor = styled.a<SCAnchorProps>`
  padding-top: 0.125rem;
  padding-top: 0.125rem;
  display: inline-block;
  span {
    padding-right: 1ch !important;
  }
  ${(props) =>
    props.center &&
    `
       {
        color: #6b6b6b !important;
        text-align: center;
        display: block;
        width: 100%;
        // border-top: 1px solid #e4e4e4;
      }
    `}
`;
