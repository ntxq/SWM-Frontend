import React from "react";
import { Card, Typography } from "antd";

import CropWebtoon from "./CropWebtoon";

function WebtoonCard(props) {
  return (
    <Card
      hoverable
      cover={<CropWebtoon url={props.url} />}
      className="preview_card"
    >
      <Card.Meta
        title={
          <Typography.Text className="title" ellipsis={true}>
            {props.name}
          </Typography.Text>
        }
      />
    </Card>
  );
}

export default WebtoonCard;
