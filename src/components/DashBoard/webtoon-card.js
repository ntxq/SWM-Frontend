import React from "react";
import { Card, Typography } from "antd";

import CropWebtoon from "./crop-webtoon";

function WebtoonCard(properties) {
  return (
    <Card
      hoverable
      cover={<CropWebtoon url={properties.url} />}
      className="preview_card"
    >
      <Card.Meta
        title={
          <Typography.Text className="title" ellipsis={true}>
            {properties.name}
          </Typography.Text>
        }
      />
    </Card>
  );
}

export default WebtoonCard;
