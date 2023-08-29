import React, { ReactNode, useState } from "react";
import { Layout, Menu, Space } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  PlayCircleOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

const { Sider, Content, Header } = Layout;

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const lastPathSegment: string | any = currentPath.split("/").pop();

  const menuItems = [
    {
      key: "dashboard",
      icon: <HomeOutlined />,
      label: "Home",
      link: "/dashboard",
    },
    {
      key: "user",
      icon: <UserOutlined />,
      label: "User",
      link: "/dashboard/user",
    },
    {
      key: "artist",
      icon: <UsergroupAddOutlined />,
      label: "Artist",
      link: "/dashboard/artist",
    },
    {
      key: "music",
      icon: <PlayCircleOutlined />,
      label: "Music",
      link: "/dashboard/music",
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} theme="dark">
        <div
          className="logo"
          style={{
            backgroundColor: "#2f3542",
            padding: "24px 0",
            textAlign: "center",
          }}
        >
          <div className="logo-text">
            <h1 style={{ color: "#ffffff", fontSize: "1.8rem", margin: 0 }}>
              Dashboard
            </h1>
          </div>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[lastPathSegment]}>
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.link}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="dashboard-header"
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>Artist Management System</h2>
          <Link to="/login">
            <Space>
              <PoweroffOutlined />
              <span>Logout</span>
            </Space>
          </Link>
        </Header>
        <Content
          style={{
            // margin: "16px",
            background: "#f0f2f5",
            padding: "24px",
            // borderRadius: "8px",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
