import React from "react";
import { Card, Skeleton, Typography } from "antd";
import { useHistory } from "react-router";

import CropWebtoon from "./crop-webtoon";

function WebtoonCard(properties) {
  const history = useHistory();

  return (
    <Card
      hoverable
      cover={
        properties.url ? (
          <CropWebtoon url={properties.url} />
        ) : (
          <Skeleton.Image />
        )
      }
      onClick={() => {
        if (properties.webtoonIndex !== undefined && properties.url)
          history.push(
            `/editor/${properties.webtoonIndex}/${properties.index}/segmentation`
          );
        else if (properties.url) history.push(`/dashboard/${properties.index}`);
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
