import React from "react";
import { Layout, Image, Card, Typography } from "antd";
import { useSelector } from "react-redux";

function PreviewSider(properties) {
  const webtoons = useSelector((state) => state.webtoons.images);
  return (
    <Layout.Sider width={300} className="preview_sider">
      {webtoons.map((image, index) => (
        <Card
          cover={
            <div className="side_crop">
              <Image
                src={image[0]}
                key={index}
                preview={false}
                className="side_image"
              />
            </div>
          }
          className="side_card"
        >
          <Card.Meta
            title={
              <Typography.Text className="title" ellipsis={true}>
                {image[1]}
              </Typography.Text>
            }
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}

export default PreviewSider;
