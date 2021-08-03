import React from "react";
import { Layout, Image, Card, Typography } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function PreviewSider(properties) {
  const webtoons = useSelector((state) => state.webtoons.images);
  const history = useHistory();

  return (
    <Layout.Sider
      breakpoint="xxl"
      collapsedWidth={0}
      width="12vw"
      className="preview_sider"
    >
      {webtoons.map((image, index) => (
        <Card
          cover={
            <div className="side_crop">
              <Image
                src={image.original}
                key={index}
                preview={false}
                className="side_image"
              />
            </div>
          }
          hoverable
          onClick={() => history.push(`/editor/${index}/segmentation`)}
          key={image.filename}
          className="side_card"
        >
          <Card.Meta
            title={
              <Typography.Text className="title" ellipsis={true}>
                {image.filename}
              </Typography.Text>
            }
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}

export default PreviewSider;
