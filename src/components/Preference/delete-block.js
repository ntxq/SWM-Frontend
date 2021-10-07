import { Button, Col, Row, Space, Typography } from "antd";
import React from "react";

function DeleteBlock(properties) {
  return (
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
  );
}

export default DeleteBlock;
