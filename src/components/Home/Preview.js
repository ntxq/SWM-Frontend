import React from "react";
import { useSelector } from "react-redux";
import { Image, Typography, Card, Row, Col } from "antd";

function CropImage(props) {
  return (
    <div className="crop">
      <Image src={props.url} className="preview_image" />
    </div>
  );
}

function Preview(props) {
  const webtoons = useSelector((state) => state.webtoon.images);

  return (
    <div className="preview">
      <Typography.Title level={3}>
        총 {webtoons.length}개의 번역할 웹툰
      </Typography.Title>
      <Row>
        {webtoons.map(([url, name]) => (
          <Col span={4}>
            <Card
              hoverable
              cover={<CropImage url={url} />}
              className="preview_card"
            >
              <Card.Meta title={name} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Preview;
