import React, { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

import UserAvatar from "./user-avatar";
import MenuLogin from "./menu-login";
import useProfile from "./use-profile";

function MenuAvatar(properties) {
  const [kakaoCookie, setKakaoCookie] = useState(false);
  const profile = useProfile();

  useLayoutEffect(() => {
    setKakaoCookie(
      document.cookie.split("; ").some((row) => row.startsWith("kakao_token="))
    );
  }, []);

  return kakaoCookie ? (
    <Menu.SubMenu className="menu_avatar" key="avatar" title={<UserAvatar />}>
      <Menu.Item key="username">
        <Link to="/profile">
          <b>{profile.username}</b>
        </Link>
      </Menu.Item>
      <Menu.Item key="change_plan">
        <Link to="/plans">Upgrade plan</Link>
      </Menu.Item>
      <Menu.Item key="preference">
        <Link to="/preference">Edit profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Link to="/login?reset=true">Sign out</Link>
      </Menu.Item>
    </Menu.SubMenu>
  ) : (
    <MenuLogin />
  );
}

export default MenuAvatar;
