import React from "react";
import { Card, Typography } from "antd";
import { useHistory } from "react-router";

import CropWebtoon from "./crop-webtoon";

function WebtoonCard(properties) {
  const history = useHistory();

  return (
    <Card
      hoverable
      cover={<CropWebtoon url={properties.url} />}
      onClick={() => {
        if (properties.id)
          history.push(`/editor/${properties.index}/segmentation`);
      }}
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
