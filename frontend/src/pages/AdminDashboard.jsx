import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import UserManager from "../components/Admin/UserManager";
import ItemManager from "./ItemManager";
import OrderManager from "./OrderManager";

const { Header, Content, Sider } = Layout;

const AdminDashboard = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const onMenuItemClicked = (index) => {
    setActiveIndex(index);
  };

  const menuItemStyle = (index) => ({
    backgroundColor: activeIndex === index ? "#ffa500" : "transparent",
    color: activeIndex === index ? "#ffffff" : "#9e9e9e",
    fontWeight: activeIndex === index ? "600" : "400",
    borderRadius: "6px",
    padding: "14px 22px",
    transition: "background-color 0.3s, color 0.3s",
    margin: "8px 0",
  });

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      <Sider
        width={250}
        style={{
          backgroundColor: "#fff",
          boxShadow: "2px 0 15px rgba(0, 0, 0, 0.1)",
          position: "fixed",
        }}
      >
        <div
          style={{
            color: "#fff",
            fontSize: "26px",
            fontWeight: "700",
            textAlign: "center",
            padding: "24px 16px",
            backgroundColor: "#ff9e00 ",
            borderRadius: "30px",

            letterSpacing: "1px",
          }}
        >
          Admin Dashboard
        </div>
        <Menu
          mode="inline"
          selectedKeys={[`${activeIndex}`]}
          style={{
            backgroundColor: "#ffc87c",
            borderRight: "none",
            borderRadius: "30px",
            paddingTop: "16px",
            paddingBottom: "16px",
            paddingRight: "10px",
            paddingLeft: "10px",
          }}
        >
          <Menu.Item
            onClick={() => onMenuItemClicked(1)}
            key="1"
            icon={<UserOutlined style={{ color: "#fff" }} />}
            style={menuItemStyle(1)}
          >
            User Manager
          </Menu.Item>
          <Menu.Item
            onClick={() => onMenuItemClicked(2)}
            key="2"
            icon={<AppstoreOutlined style={{ color: "#fff" }} />}
            style={menuItemStyle(2)}
          >
            Item Manager
          </Menu.Item>
          <Menu.Item
            onClick={() => onMenuItemClicked(3)}
            key="3"
            icon={<ShoppingCartOutlined style={{ color: "#fff" }} />}
            style={menuItemStyle(3)}
          >
            Order Manager
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 250 }}>
        <Header
          style={{
            padding: "16px 24px",
            backgroundColor: "#ffffff",
            color: "#ff8c00",
            fontSize: "22px",
            fontWeight: "600",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{ fontSize: "22px", fontWeight: "600", color: "#ff8c00" }}
          >
            {activeIndex === 1 && "User Management"}
            {activeIndex === 2 && "Item Management"}
            {activeIndex === 3 && "Order Management"}
          </div>
        </Header>
        <Content
          style={{
            margin: "40px",
            padding: "40px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            minHeight: "calc(100vh - 120px)",
          }}
        >
          <div
            style={{
              padding: "24px",
              backgroundColor: "#f9f9f9",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {activeIndex === 1 && <UserManager />}
            {activeIndex === 2 && <ItemManager />}
            {activeIndex === 3 && <OrderManager />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
