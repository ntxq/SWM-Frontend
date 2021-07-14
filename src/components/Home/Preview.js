import React from "react";
import { useSelector } from "react-redux";
import { Typography, Row, Col } from "antd";

import PreviewCard from "./PreviewCard";

function Preview(props) {
  const webtoons = useSelector((state) => state.webtoons.images);

  return (
    <>
      {webtoons.length > 0 && (
        <Typography.Title level={3}>
          총 {webtoons.length}개의 번역할 웹툰
        </Typography.Title>
      )}
      <Row>
        {webtoons.map(([url, name, inpaint], index) => (
          <Col span={4} key={name}>
            <PreviewCard
              url={url}
              name={name}
              index={index}
              inpaint={inpaint}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Preview;
