import React from "react";
import { Button, Card, Col, Input, Row, Space, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { deleteBox, updateText } from "../../contexts/recognition-slice";

function RecognitionEditor(properties) {
  const recognition = useSelector((state) => state.recognition);
  const dispatch = useDispatch();

  return (
    <Card>
      <Row>
        <Col span={20}>
          <Typography.Title level={2}>Recognition Editor</Typography.Title>
        </Col>
        <Col span={2}>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => dispatch(deleteBox(recognition.activeBox))}
          />
        </Col>
        <Col span={2}>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            danger
            onClick={() => dispatch(deleteBox())}
          />
        </Col>
      </Row>
      <Space direction="vertical">
        <Typography.Text>Active Box: {recognition.activeBox}</Typography.Text>
        <Input
          value={
            recognition.activeBox !== undefined
              ? recognition.bboxText[recognition.activeBox][0]
              : ""
          }
          onChange={(event) =>
            dispatch(
              updateText({
                original: true,
                index: recognition.activeBox,
                text: event.target.value,
              })
            )
          }
        />
        <Input
          value={
            recognition.activeBox !== undefined
              ? recognition.bboxText[recognition.activeBox][1]
              : ""
          }
          onChange={(event) =>
            dispatch(
              updateText({
                original: false,
                index: recognition.activeBox,
                text: event.target.value,
              })
            )
          }
        />
      </Space>
    </Card>
  );
}

export default RecognitionEditor;
