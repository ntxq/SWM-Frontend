import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

import UserAvatar from "./user-avatar";

function MenuAvatar(properties) {
  return (
    <Menu.SubMenu className="menu_avatar" key="avatar" title={<UserAvatar />}>
      <Menu.Item key="username">
        <Link to="/profile">
          <b>Username</b>
        </Link>
      </Menu.Item>
      <Menu.Item key="change_plan">
        <Link to="/plans">Upgrade plan</Link>
      </Menu.Item>
      <Menu.Item key="preference">
        <Link to="/preference">Edit profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="sign_out">Sign out</Menu.Item>
    </Menu.SubMenu>
  );
}

export default MenuAvatar;
