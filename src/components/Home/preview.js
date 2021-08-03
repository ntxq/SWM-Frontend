import React from "react";
import { useSelector } from "react-redux";
import { Typography, Row, Col } from "antd";

import PreviewCard from "./preview-card";

function Preview(properties) {
  const webtoons = useSelector((state) => state.webtoons.images);

  return (
    <>
      {webtoons.length > 0 && (
        <Typography.Title level={3}>
          총 {webtoons.length}개의 번역할 웹툰
        </Typography.Title>
      )}
      <Row>
        {webtoons.map((image, index) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={image.filename}>
            <PreviewCard
              url={image.original}
              name={image.filename}
              index={index}
              inpaint={image.inpaint}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Preview;
