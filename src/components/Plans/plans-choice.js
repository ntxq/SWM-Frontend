import React from "react";
import { Card, Typography, Button, Col } from "antd";

function PlansChoice(properties) {
  return (
    <Col span={8}>
      <Card
        title={
          <Typography.Title level={3}>{properties.title}</Typography.Title>
        }
        cover={
          <>
            <Typography.Title level={4} className="plans_price">
              {properties.price}
              <Typography.Text className="plans_price_interval">
                /mo
              </Typography.Text>
            </Typography.Title>
          </>
        }
        actions={[
          <Button type="primary" size="large" className="plans_button">
            {properties.buttonText}
          </Button>,
        ]}
      >
        <div className="plans_description">{properties.description}</div>
      </Card>
    </Col>
  );
}

export default PlansChoice;
