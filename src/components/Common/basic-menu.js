import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import MenuAvatar from "./menu-avatar";

function BasicMenu(properties) {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={properties.default}
      selectable={false}
    >
      <Menu.Item key={1}>
        <Link to="/home">Home</Link>
      </Menu.Item>
      <Menu.Item key={2}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key={3}>Editor</Menu.Item>

      <MenuAvatar />
    </Menu>
  );
}

export default BasicMenu;
