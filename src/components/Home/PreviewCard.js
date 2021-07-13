import React from "react";
import { Card, Button, Typography, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { singleDelete } from "../../contexts/webtoonDropSlice";

import CropImage from "./CropImage";
import BlankUpload from "./BlankUpload";

function PreviewCard(props) {
  const dispatch = useDispatch();

  return (
    <Card
      hoverable
      cover={<CropImage url={props.url} />}
      className="preview_card"
    >
      <BlankUpload index={props.index} inpaint={props.inpaint} />
      <Card.Meta
        title={
          <Row>
            <Col span={20}>
              <Typography.Text className="title" ellipsis={true}>
                {props.name}
              </Typography.Text>
            </Col>
            <Col span={4}>
              <Button
                className="delete"
                icon={<DeleteOutlined />}
                onClick={() => dispatch(singleDelete(props.index))}
              />
            </Col>
          </Row>
        }
      />
    </Card>
  );
}

export default PreviewCard;
