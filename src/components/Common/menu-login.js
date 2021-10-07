import { Button, Menu, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function MenuLogin(properties) {
  return (
    <Menu.Item className="menu_login">
      <Space>
        <Button className="menu_login_button">
          <Link to="/login">
            <b>Log In</b>
          </Link>
        </Button>
      </Space>
    </Menu.Item>
  );
}

export default MenuLogin;
