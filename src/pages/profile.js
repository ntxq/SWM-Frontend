import React from "react";
import { Avatar, Button, Card, Space, Typography, List, Image } from "antd";
import {
  EditOutlined,
  UserOutlined,
  FileImageOutlined,
} from "@ant-design/icons";

import Template from "./template";
import "../styles/Profile.css";
import { Link } from "react-router-dom";

function Profile(properties) {
  return (
    <Template
      className="profile"
      defaultMenu="username"
      headerClass="header"
      contentClass="content"
      footerClass="footer"
    >
      <div className="profile_top">
        <Link to="/preference">
          <Button icon={<EditOutlined />} className="profile_edit_button" />
        </Link>
        <Avatar className="profile_avatar" size={100} icon={<UserOutlined />} />

        <div className="profile_text">
          <Typography.Title level={3}>Username</Typography.Title>
          <Space>
            <Typography.Text>@userid</Typography.Text>
            <Typography.Text>{"\u00B7"}</Typography.Text>
            <Typography.Text>Member since September 14, 1999</Typography.Text>
          </Space>
        </div>
      </div>

      <Card
        title={<Typography.Title level={3}>Created Projects</Typography.Title>}
        extra={
          <div className="profile_quota">
            <div className="profile_quota_box">
              <div className="profile_quota_fill" />
            </div>
            <Typography.Text>11.65 GB of 15 GB used</Typography.Text>
          </div>
        }
        className="profile_card"
      >
        <List itemLayout="vertical">
          <List.Item
            extra={
              <Image
                width={125}
                preview={{
                  visible: false,
                  mask: (
                    <Space>
                      <FileImageOutlined />
                      Change image
                    </Space>
                  ),
                }}
                src="https://shared-comic.pstatic.net/thumb/webtoon/648419/thumbnail/thumbnail_IMAG06_44119122-8568-4293-9159-a99e2a6b0558.jpg"
              />
            }
          >
            <List.Item.Meta
              title="Project title"
              description="Created on: September 8, 2021"
            />
            <Typography.Text editable={true}>
              Quisque consequat non tortor vitae sodales. Nulla porttitor,
              ligula nec volutpat maximus, dolor diam ornare dui, in laoreet
              velit augue malesuada metus. Donec ullamcorper mauris quis egestas
              convallis.
            </Typography.Text>
          </List.Item>

          <List.Item
            extra={
              <Image
                width={125}
                preview={{
                  visible: false,
                  mask: (
                    <Space>
                      <FileImageOutlined />
                      Change image
                    </Space>
                  ),
                }}
                src="https://shared-comic.pstatic.net/thumb/webtoon/183559/thumbnail/thumbnail_IMAG06_b1272b70-7eb4-4c1e-bc08-50bf924e73be.jpg"
              />
            }
          >
            <List.Item.Meta
              title="Project title2"
              description="Created on: September 21, 2021"
            />
            <Typography.Text type="secondary" editable={true}>
              No description
            </Typography.Text>
          </List.Item>
        </List>
      </Card>
    </Template>
  );
}

export default Profile;
