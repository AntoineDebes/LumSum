import styled, { css } from "styled-components";

interface anchorLinkProps {
  active?: boolean;
}

interface SideBarLinkNavProps {
  selected: string;
  active?: boolean;
}

export const AsideHeader = styled.div`
  margin-bottom: 3em;

  @media (max-width: 1023px) {
    display: none;
  }
`;

export const UserGreeting = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.h2};
  color: ${({ theme }) => theme.colors.textDark};
`;

export const LinkList = styled.ul`
  margin-bottom: 0;
`;

export const LinkLi = styled.li`
  margin-bottom: 2.25em;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const AnchorLink = styled.a<anchorLinkProps>`
  font-weight: 700;
  display: flex;
  align-items: center;
  position: relative;

  ${(props) =>
    props.active &&
    css`
      color: ${({ theme }) => theme.colors.primary};
    `}

  @media (max-width: 1023px) {
    ${(props) =>
      props.active &&
      css`
        background: #fff;

        &::before {
          content: "";
          background: ${({ theme }) => theme.colors.primary};
          width: 100%;
          height: 1px;
          position: absolute;
          top: 0;
          right: 0;
        }
      `}
  }
`;

export const IconWrap = styled.span`
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  position: relative;
`;

export const SideBarLinkNav = styled.nav<SideBarLinkNavProps>`
  @media (max-width: 1023px) {
    ${LinkList} {
      background: ${({ theme }) => theme.colors.lightGrey3};
      display: flex;
      flex-wrap: wrap;
      margin: -1.75rem -1rem 0;
    }

    ${LinkLi} {
      margin-bottom: 0;
    }

    ${AnchorLink} {
      padding: 1rem 1.5rem;

      ${(props) =>
        props.active &&
        css`
          background: #fff;
        `}
    }

    ${IconWrap} {
      display: none;
    }
  }
`;
