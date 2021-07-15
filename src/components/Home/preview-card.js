import React from "react";
import { Card, Button, Typography, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { singleDelete } from "../../contexts/webtoon-drop-slice";

import CropImage from "./crop-image";
import BlankUpload from "./blank-upload";

function PreviewCard(properties) {
  const dispatch = useDispatch();

  return (
    <Card
      hoverable
      cover={
        <>
          <CropImage url={properties.url} />
          <span className="cover_space" />
          <BlankUpload index={properties.index} inpaint={properties.inpaint} />
        </>
      }
      className="preview_card"
    >
      <Card.Meta
        title={
          <Row>
            <Col span={20}>
              <Typography.Text className="title" ellipsis={true}>
                {properties.name}
              </Typography.Text>
            </Col>
            <Col span={4}>
              <Button
                className="delete"
                icon={<DeleteOutlined />}
                onClick={() => {
                  URL.revokeObjectURL(properties.url)
                  dispatch(singleDelete(properties.index))
                }}
              />
            </Col>
          </Row>
        }
      />
    </Card>
  );
}

export default PreviewCard;
