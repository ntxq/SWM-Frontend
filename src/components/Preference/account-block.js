import React from "react";
import { Col, Input, Row, Space, Typography } from "antd";
import PreferenceBlock from "./preference-block";
import useProfile from "../Common/use-profile";

function AccountBlock(properties) {
  const profile = useProfile();

  return (
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
            defaultValue={profile.username}
            onChange={properties.nameChange}
            description="Enter your name, so people you know can recognize you"
          />

          <PreferenceBlock
            title="Email"
            defaultValue={profile.email}
            onChange={properties.emailChange}
            description="We use email for content verification and password reset"
          />

          <div className="preference_block">
            <Typography.Title level={5}>Password</Typography.Title>

            <Space direction="vertical">
              <Typography.Text strong>Current Password</Typography.Text>
              <Input.Password placeholder="Enter current password" disabled />
              <Typography.Text strong>New Password</Typography.Text>
              <Input.Password placeholder="Enter new password" disabled />
              <Typography.Text strong>Confirm Password</Typography.Text>
              <Input.Password placeholder="Enter new password again" disabled />
              <Typography.Text type="secondary">
                You must provide your current password in order to change it.
              </Typography.Text>
            </Space>
          </div>
        </Space>
      </Col>
    </Row>
  );
}

export default AccountBlock;
