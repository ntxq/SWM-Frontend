import React from "react";
import { Avatar, Space } from "antd";
import { UserOutlined, ArrowDownOutlined } from "@ant-design/icons";

function UserAvatar(properties) {
  return (
    <Space>
      <Avatar
        className="user_avatar"
        size="large"
        src={properties.src || <UserOutlined />}
      />
      <ArrowDownOutlined />
    </Space>
  );
}

export default UserAvatar;
