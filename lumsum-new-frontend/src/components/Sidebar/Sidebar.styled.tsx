import styled from "styled-components";

interface OverlayProps {
  collapsed: boolean;
}

export const Sidebar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 30;

  .ant-layout-sider {
    height: 100%;
  }

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
`;

export const Overlay = styled.div<OverlayProps>`
  background-color: #70707070;
  width: 100vw !important;
  height: 100%;
  width: 0;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  transition-property: background-color, width;
  transition-duration: 0.2s, 0.0001s ease-in;
  ${(props) =>
    props.collapsed &&
    `
      {
        background-color: transparent;
        width: 0 !important;
      }
    `}
`;

export const SidebarHead = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 1.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  * {
    color: #fff;
  }
`;

export const SidebarBody = styled.div`
  padding: 1.5rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  .ant-menu-vertical {
    border-right: none;
  }

  .ant-menu-submenu-title {
    font-size: ${({ theme }) => theme.fontSize.small};
    line-height: 2;
    height: unset;
    padding-left: 0;
  }
`;

export const SidebarTitle = styled.h5`
  margin-bottom: 0.75em;
`;

export const SidebarFooter = styled.div`
  padding: 1.5rem 1rem;
`;

export const SidebarLinkList = styled.ul``;

export const SidebarLinkListLi = styled.li``;

export const SidebarLinks = styled.a`
  font-size: ${({ theme }) => theme.fontSize.small};
  line-height: 2;
  display: block;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`;
