import React from "react";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Row,
  Space,
  Typography,
  Upload,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";

function AvatarBlock(properties) {
  return (
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
  );
}

export default AvatarBlock;
