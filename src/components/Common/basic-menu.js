import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

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
    </Menu>
  );
}

export default BasicMenu;
