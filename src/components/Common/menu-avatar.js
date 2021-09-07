import React from "react";
import { Menu, Typography } from "antd";
import UserAvatar from "./user-avatar";
import { Link } from "react-router-dom";

function MenuAvatar(properties) {
  return (
    <Menu.SubMenu className="menu_avatar" key="avatar" title={<UserAvatar />}>
      <Menu.Item key="username">
        <Link to="/profile">
          <Typography.Text style={{ fontWeight: "bold" }}>
            Username
          </Typography.Text>
        </Link>
      </Menu.Item>
      <Menu.Item key="change_plan">
        <Typography.Text>Upgrade plan</Typography.Text>
      </Menu.Item>
      <Menu.Item key="edit_profile">
        <Typography.Text>Edit profile</Typography.Text>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="sign_out">
        <Typography.Text>Sign out</Typography.Text>
      </Menu.Item>
    </Menu.SubMenu>
  );
}

export default MenuAvatar;
