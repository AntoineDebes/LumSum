import React, { FC } from "react";
import styled from "styled-components/macro";
import { Layout, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { DashboardOutlined, SettingOutlined, ShopOutlined, SolutionOutlined, TeamOutlined, TrophyOutlined } from "@ant-design/icons";
import { useAuthContext } from "../../context/AuthContext";

const SideMenu: FC = () => {
    const {
        state: { user },
    } = useAuthContext();
    return (
        <Sider>
            <Header>
                <Title level={3}>Admin Panel</Title>
            </Header>
            <Menu>
                <MenuItem>
                    <NavLink to="/dashboard">
                        <DashboardOutlined />
                        <span>Dashboard</span>
                    </NavLink>
                </MenuItem>
                {user && user.role === "SUPER_ADMIN" && (
                    <MenuItem>
                        <NavLink to="/admins">
                            <TeamOutlined />
                            <span>Admins</span>
                        </NavLink>
                    </MenuItem>
                )}
                <MenuItem>
                    <NavLink to="/users">
                        <TeamOutlined />
                        <span>Users</span>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to="/suppliers">
                        <TeamOutlined />
                        <span>Suppliers</span>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to="/categories">
                        <ShopOutlined />
                        <span>Categories</span>
                    </NavLink>
                </MenuItem>
                {/* <MenuItem>
          <NavLink to="/categories-text">
            <ShopOutlined />
            <span>Category Text</span>
          </NavLink>
        </MenuItem> */}
                <MenuItem>
                    <NavLink to="/products">
                        <ShopOutlined />
                        <span>Product</span>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to="/reviews">
                        <SolutionOutlined />
                        <span>Reviews</span>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to="/blogs">
                        <SolutionOutlined />
                        <span>Blogs</span>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to="/leader-board">
                        <TrophyOutlined />
                        <span>Leader Board</span>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to="/settings">
                        <SettingOutlined />
                        <span>Settings</span>
                    </NavLink>
                </MenuItem>
            </Menu>
        </Sider>
    );
};

export default SideMenu;

const Sider = styled(Layout.Sider)`
    overflow: auto;
    height: 100vh;
    position: fixed;
    background-color: #049e94;
    color: #fff;
    left: 0;
`;

const Header = styled(Layout.Header)`
    position: sticky;
    z-index: 1;
    width: 100%;
    top: 0;
    background-color: transparent;
    padding: 0;
    border-bottom: 1px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled(Typography.Title)`
    color: #fff !important;
    text-align: center;
    margin: 0 !important;
`;

const Menu = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 8px;
    margin: 0;
`;

const MenuItem = styled.li`
    width: 100%;
    margin-bottom: 5px;

    a {
        width: 100%;
        padding: 10px 15px;
        align-items: center;
        font-size: 16px;
        display: flex;
        border-radius: 4px;

        span {
            color: #fff;
            &:first-child {
                margin-right: 8px;
            }
        }

        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }
`;
