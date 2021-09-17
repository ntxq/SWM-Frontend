import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, Space, Typography } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import useProfile from "../Common/use-profile";

function ProfileTop(properties) {
  const profile = useProfile();

  return (
    <div className="profile_top">
      <Link to="/preference">
        <Button icon={<EditOutlined />} className="profile_edit_button" />
      </Link>
      <Avatar className="profile_avatar" size={100} icon={<UserOutlined />} />

      <div className="profile_text">
        <Typography.Title level={3}>{profile.username}</Typography.Title>
        <Space>
          <Typography.Text>{profile.email}</Typography.Text>
          <Typography.Text>{"\u00B7"}</Typography.Text>
          <Typography.Text>Member since {profile.createTime}</Typography.Text>
        </Space>
      </div>
    </div>
  );
}

export default ProfileTop;
