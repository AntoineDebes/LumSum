import React, { FC } from "react";
import { useApolloClient } from "@apollo/client";
import styled from "styled-components/macro";
import { Layout, Typography, Tooltip } from "antd";
import { Link, useLocation } from "react-router-dom";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { getRouteTitle } from "../../constants/router";
import { useAuthContext } from "../../context/AuthContext";
import * as AUTH from "../../constants/auth";

const Header: FC = () => {
  const client = useApolloClient();
  const { pathname } = useLocation();
  const { dispatch } = useAuthContext();

  const handleLogout = () => {
    client.clearStore();
    localStorage.removeItem("token");
    dispatch({ type: AUTH.LOGOUT });
  };

  return (
    <StyledHeader>
      <Title level={3}>{getRouteTitle(pathname)}</Title>
      <Menu>
        <Tooltip placement="bottom" title="Profile">
          <StyledButton disabled>
            <UserOutlined />
            <span>Admin</span>
          </StyledButton>
        </Tooltip>
        <Tooltip placement="bottom" title="Logout">
          <StyledButton onClick={handleLogout}>
            <LogoutOutlined />
            <span>Logout</span>
          </StyledButton>
        </Tooltip>
      </Menu>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled(Layout.Header)`
  position: sticky;
  z-index: 1;
  width: 100%;
  top: 0;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  border-radius: 5px;
  margin-left: 10px;

  span {
    color: #049e94;
    margin: 0 2px;
  }

  &:hover {
    background-color: rgba(4, 158, 148, 0.1);

    span {
      color: #000;
    }
  }
`;

const StyledButton = styled.button`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  border-radius: 5px;
  margin-left: 10px;
  border: 0;
  background-color: transparent;

  span {
    color: #049e94;
    margin: 0 2px;
  }

  &:hover:not([disabled]) {
    background-color: rgba(4, 158, 148, 0.1);
    cursor: pointer;
    span {
      color: #000;
    }
  }
`;

const Title = styled(Typography.Title)`
  margin: 0 !important;
  color: #049e94 !important;
`;

const Menu = styled.nav`
  display: flex;
  align-items: center;
`;
