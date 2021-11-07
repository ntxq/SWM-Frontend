import React from "react";
import {
  Button,
  InputNumber,
  Space,
  Tooltip,
  Typography,
  Row,
  Col,
} from "antd";
import { BoldOutlined, ItalicOutlined } from "@ant-design/icons";
import { CompactPicker } from "react-color";
import { CgFormatText } from "react-icons/cg";
import FontPicker from "font-picker-react";

import useUpdateBox from "./use-update-box";

function StyleEditor(properties) {
  const updateBox = useUpdateBox();

  return (
    <>
      <Typography.Title level={5}>Text Styles</Typography.Title>
      <Row gutter={[0, "3vh"]}>
        <Col span={24} xxl={13}>
          <CompactPicker
            color={properties.fontColor || "#000000"}
            onChange={(color) =>
              properties.activeBox !== undefined &&
              updateBox({
                requestID: properties.requestID,
                cutIndex: properties.cutIndex,
                index: properties.activeBox,
                updatedBox: { fontColor: color.hex },
              })
            }
          />
        </Col>
        <Col span={9}>
          <Space direction="vertical">
            <FontPicker
              apiKey="AIzaSyA3CAm6MkBaH8hrrD9SFGxfDxyPqxo4geI"
              activeFontFamily={properties.fontFamily || "Nanum Gothic"}
              onChange={(nextFont) =>
                properties.activeBox !== undefined &&
                updateBox({
                  requestID: properties.requestID,
                  cutIndex: properties.cutIndex,
                  index: properties.activeBox,
                  updatedBox: { fontFamily: nextFont.family },
                })
              }
              scripts={["latin", "korean"]}
            />
            <Space>
              <Space>
                <Typography.Text>Font Size:</Typography.Text>
                <InputNumber
                  value={Math.round(properties.fontSize) || 20}
                  onChange={(value) =>
                    properties.activeBox !== undefined &&
                    updateBox({
                      requestID: properties.requestID,
                      cutIndex: properties.cutIndex,
                      index: properties.activeBox,
                      updatedBox: { fontSize: value },
                    })
                  }
                />
              </Space>
              <Tooltip title="Bold">
                <Button
                  icon={<BoldOutlined />}
                  type="text"
                  onClick={() =>
                    properties.activeBox !== undefined &&
                    updateBox({
                      requestID: properties.requestID,
                      cutIndex: properties.cutIndex,
                      index: properties.activeBox,
                      updatedBox: {
                        fontWeight:
                          properties.fontWeight === "normal"
                            ? "bold"
                            : "normal",
                      },
                    })
                  }
                />
              </Tooltip>
              <Tooltip title="italic">
                <Button
                  icon={<ItalicOutlined />}
                  type="text"
                  onClick={() =>
                    properties.activeBox !== undefined &&
                    updateBox({
                      requestID: properties.requestID,
                      cutIndex: properties.cutIndex,
                      index: properties.activeBox,
                      updatedBox: {
                        fontStyle:
                          properties.fontStyle === "normal"
                            ? "italic"
                            : "normal",
                      },
                    })
                  }
                />
              </Tooltip>
              <Tooltip title="stroke">
                <Button
                  icon={<CgFormatText />}
                  type="text"
                  onClick={() =>
                    properties.activeBox !== undefined &&
                    updateBox({
                      requestID: properties.requestID,
                      cutIndex: properties.cutIndex,
                      index: properties.activeBox,
                      updatedBox: {
                        fontStroke: !properties.fontStroke,
                      },
                    })
                  }
                ></Button>
              </Tooltip>
            </Space>
          </Space>
        </Col>
      </Row>
    </>
  );
}

export default StyleEditor;
