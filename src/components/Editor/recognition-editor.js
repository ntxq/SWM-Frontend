import React from "react";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Space,
  Typography,
  InputNumber,
} from "antd";
import { SketchPicker } from "react-color";
import { DeleteOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { deleteBox, updateText } from "../../contexts/recognition-slice";

function RecognitionEditor(properties) {
  const recognition = useSelector((state) => state.recognition);
  const dispatch = useDispatch();
  const history = useHistory();

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
              ? recognition.bboxText[recognition.activeBox].original
              : ""
          }
          onChange={(event) =>
            dispatch(
              updateText({
                index: recognition.activeBox,
                text: { original: event.target.value },
              })
            )
          }
        />
        <Input
          value={
            recognition.activeBox !== undefined
              ? recognition.bboxText[recognition.activeBox].translated
              : ""
          }
          onChange={(event) =>
            dispatch(
              updateText({
                index: recognition.activeBox,
                text: { translated: event.target.value },
              })
            )
          }
        />
        <Space>
          <Typography.Text>Font Size:</Typography.Text>
          <InputNumber
            value={
              recognition.activeBox !== undefined
                ? recognition.bboxText[recognition.activeBox].fontSize
                : 0
            }
            onChange={(value) =>
              recognition.activeBox !== undefined &&
              dispatch(
                updateText({
                  index: recognition.activeBox,
                  text: { fontSize: value },
                })
              )
            }
          />
        </Space>
        <SketchPicker
          color={
            recognition.activeBox !== undefined
              ? recognition.bboxText[recognition.activeBox].fontColor
              : ""
          }
          onChange={(color) =>
            recognition.activeBox !== undefined &&
            dispatch(
              updateText({
                index: recognition.activeBox,
                text: { fontColor: color.hex },
              })
            )
          }
        />
        <Button
          type="primary"
          onClick={() => {
            console.log(recognition);
            history.push("/dashboard");
          }}
        >
          Submit
        </Button>
      </Space>
    </Card>
  );
}

export default RecognitionEditor;
