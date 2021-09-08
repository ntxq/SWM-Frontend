import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Typography,
  Upload,
  Input,
} from "antd";
import {
  UploadOutlined,
  UserOutlined,
  SaveOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import React from "react";

import Template from "./template";
import PreferenceBlock from "../components/Preference/preference-block";
import "../styles/Preference.css";

function Preference(properties) {
  return (
    <Template
      className="preference"
      defaultMenu="preference"
      headerClass="header"
      contentClass="content"
      footerClass="footer"
    >
      <Card
        extra={
          <div className="preference_save">
            <Button type="primary" icon={<SaveOutlined />} />
            <Button icon={<DeleteOutlined />} />
          </div>
        }
      >
        <Row>
          <Col span={8} className="preference_description">
            <Space direction="vertical">
              <Typography.Title level={2}>Public Avatar</Typography.Title>
              <Typography.Text>
                You can change your avatar here or remove the current avatar
              </Typography.Text>
            </Space>
          </Col>
          <Col span={5}>
            <Avatar
              className="preference_avatar"
              size={150}
              icon={<UserOutlined />}
            />
          </Col>
          <Col span={11} className="avatar_buttons">
            <Space direction="vertical">
              <Typography.Title level={5}>Upload new avatar</Typography.Title>
              <Space>
                <Upload>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
                No file chosen.
              </Space>
              <Typography.Text type="secondary">
                The maximum file size allowed is 300KB.
              </Typography.Text>
              <Divider className="avatar_divider" />
              <Button danger>Remove avatar</Button>
            </Space>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={8} className="preference_description">
            <Space direction="vertical">
              <Typography.Title level={2}>Account Settings</Typography.Title>
              <Typography.Text>
                Control account related information here
              </Typography.Text>
            </Space>
          </Col>
          <Col span={16}>
            <Space direction="vertical">
              <PreferenceBlock
                title="Username"
                value="yourusername"
                description="Enter your name, so people you know can recognize you"
              />

              <PreferenceBlock
                title="Email"
                value="defaultemail@gmail.com"
                description="We use email for content verification and password reset"
              />

              <div className="preference_block">
                <Typography.Title level={5}>Password</Typography.Title>

                <Space direction="vertical">
                  <Typography.Text strong>Current Password</Typography.Text>
                  <Input.Password placeholder="Enter current password" />
                  <Typography.Text strong>New Password</Typography.Text>
                  <Input.Password placeholder="Enter new password" />
                  <Typography.Text strong>Confirm Password</Typography.Text>
                  <Input.Password placeholder="Enter new password again" />
                  <Typography.Text type="secondary">
                    You must provide your current password in order to change
                    it.
                  </Typography.Text>
                </Space>
              </div>
            </Space>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={8} className="preference_description">
            <Space direction="vertical">
              <Typography.Title level={2} type="danger">
                Delete Account
              </Typography.Title>
            </Space>
          </Col>
          <Col span={16}>
            <Space direction="vertical">
              <Typography.Text>
                Once you delete your account, there is no going back. Please be
                certain.
              </Typography.Text>
              <Button type="primary" danger>
                Delete your account
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </Template>
  );
}

export default Preference;
