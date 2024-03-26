"use client";

import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Avatar, Select, Dropdown } from "antd";
import { FaRegSun, FaRegMoon } from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ETheme } from "@/utils/enums/theme.enum";
import Image from "next/image";

const { Header, Sider, Content } = Layout;

interface LayoutAdminProps {
  children: React.ReactNode;
  savedTheme: ETheme;
  onThemeChange: (value: ETheme) => void;
}

const LayoutAdmin: React.FC<LayoutAdminProps> = ({
  children,
  savedTheme,
  onThemeChange,
}) => {
  const {
    token: { colorBgContainer, colorBorder, borderRadius },
  } = theme.useToken();
  const currentPath = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider
        style={{ boxShadow: `${colorBorder} 0px 2px 4px` }}
        width={240}
        theme="light"
        className="sider"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo-sider">
          <div>
            <Image
              src="https://infotelvn.com/thumbs_size/banner/2015_12/logo_header_png/165x98_fw_logo_header.png"
              alt="logo"
              width={165}
              height={98}
            />
          </div>
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[currentPath]}
          defaultOpenKeys={[`gr${currentPath}`]}
          items={[
            {
              key: "gr/dashboard",
              icon: <FaClipboardUser />,
              label: <Link href={"/"}>Dashboard</Link>,
            },
            {
              key: "gr/actual",
              icon: <FaClipboardUser />,
              label: <Link href={"/actual"}>Management Actual</Link>,
            },
            {
              key: "gr/nested",
              icon: <FaClipboardUser />,
              label: (
                <Link href={"/nested-table"}>Management Nested Table</Link>
              ),
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          className="header"
          style={{
            background: colorBgContainer,
            boxShadow: `${colorBorder} 0px 2px 4px`,
          }}
        >
          <div className="theme-header">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />

            <Select
              id="selectTheme"
              value={savedTheme}
              style={{ width: 120 }}
              onChange={onThemeChange}
              options={[
                {
                  value: ETheme.light,
                  label: (
                    <div className="option-select">
                      <FaRegSun />
                      <span>Sáng</span>
                    </div>
                  ),
                },
                {
                  value: ETheme.dark,
                  label: (
                    <div className="option-select">
                      <FaRegMoon />
                      <span>Tối</span>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          <Dropdown trigger={["click"]} placement="bottomRight">
            <div className="admin-header">
              <Avatar size="large" icon={<UserOutlined />} />

              <div>
                <p>ADMIN</p>
                <p>Admin</p>
              </div>
            </div>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "16px 16px",
            padding: 24,
            background: colorBgContainer,
            boxShadow: `${colorBorder} 0px 2px 4px`,
            borderRadius: borderRadius,
          }}
        >
          <div className="bg-layout">
            <div style={{ backgroundColor: `${colorBgContainer}eb` }}>
              {children}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
