import React from "react";
import { Card, Typography } from "antd";
import useSegmentation from "./use-segmentation";

import CropWebtoon from "./crop-webtoon";

function WebtoonCard(properties) {
  const getSegmentation = useSegmentation(properties.id);

  return (
    <Card
      hoverable
      cover={<CropWebtoon url={properties.url} />}
      onClick={() => getSegmentation()}
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
