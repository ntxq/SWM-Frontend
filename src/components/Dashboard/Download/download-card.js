import React from "react";
import { Card, Col, Skeleton, Typography } from "antd";

import CropWebtoon from "../Webtoons/crop-webtoon";

function DownloadCard({ key, source }) {
  return (
    <Col xs={24} sm={12} md={8} lg={6} key={key} className="preview_card">
      <Card
        hoverable
        key={key}
        cover={source ? <CropWebtoon url={source} /> : <Skeleton.Image />}
      >
        <Card.Meta
          title={
            <Typography.Text className="title" ellipsis={true}>
              {key}
            </Typography.Text>
          }
        />
      </Card>
    </Col>
  );
}

export default DownloadCard;
