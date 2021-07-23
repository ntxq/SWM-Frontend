import React from "react";
import { Card, Typography } from "antd";

import CropWebtoon from "./crop-webtoon";
import useSegmentationResult from "./use-segmentation-result";

function WebtoonCard(properties) {
  const getSegmentation = useSegmentationResult(properties.index);

  return (
    <Card
      hoverable
      cover={<CropWebtoon url={properties.url} />}
      onClick={getSegmentation}
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
