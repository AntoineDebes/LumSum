import styled from "styled-components";
import Button from "@/components/Button/Button";

interface HeaderProps {
  isMinimal?: boolean;
}

export const Header = styled.div<HeaderProps>`
  background: #fff;
  box-shadow: 0 3px 8px ${({ theme }) => theme.colors.boxShadowColor};
  position: fixed;
  width: 100%;
  z-index: 29;

  .ant-layout-header {
    background: #fff;
    line-height: 1.3;
    /* max-width: ${({ theme }) => theme.maxContainerWidth}; */
    height: unset;
    padding: 0.5rem 1rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }

  .sidebar-toggle {
    height: 2.25rem;
    padding: 0.25rem;
    margin-right: 1.75rem;
  }

  @media (max-width: 1023px) {
    .ant-layout-header {
      padding: 0.75rem 1rem;
      flex-wrap: ${(props) => (props.isMinimal ? "no-wrap" : "wrap")};
      justify-content: space-between;
    }
  }

  @media (max-width: 767px) {
    .sidebar-toggle {
      margin-right: 0;

      @media (max-width: 767px) {
        margin-right: 1rem;
      }
    }
  }
`;

export const ToggleButton = styled(Button)`
  margin-right: 2.25rem;

  @media (max-width: 767px) {
    margin-right: 1rem;
  }
`;

export const leftBlock = styled.div<HeaderProps>`
  display: flex;
  align-items: center;
  padding-right: 1.5rem;

  ${(props) =>
    props.isMinimal &&
    `
      {
        padding-right: .5rem;
      }
    `}
`;

export const rightBlock = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3rem;

  @media (max-width: 1023px) {
    margin-left: 2.25rem;
  }

  @media (max-width: 767px) {
    margin-left: 1rem;
  }
`;

export const logoImgWrap = styled.div`
  position: relative;
  width: 4.5rem;
  height: 4.5rem;

  @media (max-width: 767px) {
    width: 3rem;
    height: 3rem;
  }
`;

export const logo = styled.a`
  display: flex;
`;

export const centerBlock = styled.div<HeaderProps>`
  flex: 1;

  @media (max-width: 1023px) {
    order: 1;
    flex-basis: 100%;
  }

  ${(props) =>
    props.isMinimal &&
    `
    {
      margin-right: 5rem;
    }

    @media (max-width: 767.98px) {
      margin-right: 3.5rem;
    }
  `}
`;

export const title = styled.h1`
  text-align: center;
`;
