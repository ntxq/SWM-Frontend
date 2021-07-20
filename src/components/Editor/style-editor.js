import React from "react";
import { Button, InputNumber, Space, Tooltip, Typography } from "antd";
import { BoldOutlined, ItalicOutlined } from "@ant-design/icons";
import { CompactPicker } from "react-color";
import FontPicker from "font-picker-react";

import { useDispatch } from "react-redux";
import { updateText } from "../../contexts/recognition-slice";

function StyleEditor(properties) {
  const dispatch = useDispatch();

  return (
    <Space direction="vertical">
      <Typography.Title level={5}>Text Styles</Typography.Title>
      <Space>
        <CompactPicker
          color={properties.fontColor}
          onChange={(color) =>
            properties.activeBox !== undefined &&
            dispatch(
              updateText({
                index: properties.activeBox,
                text: { fontColor: color.hex },
              })
            )
          }
        />
        <Space direction="vertical">
          <FontPicker
            apiKey="AIzaSyA3CAm6MkBaH8hrrD9SFGxfDxyPqxo4geI"
            activeFontFamily={properties.fontFamily}
            onChange={(nextFont) =>
              properties.activeBox !== undefined &&
              dispatch(
                updateText({
                  index: properties.activeBox,
                  text: { fontFamily: nextFont.family },
                })
              )
            }
            scripts={["latin", "korean"]}
          />
          <Space>
            <Space>
              <Typography.Text>Font Size:</Typography.Text>
              <InputNumber
                value={properties.fontSize}
                onChange={(value) =>
                  properties.activeBox !== undefined &&
                  dispatch(
                    updateText({
                      index: properties.activeBox,
                      text: { fontSize: value },
                    })
                  )
                }
              />
            </Space>
            <Tooltip title="Bold">
              <Button
                icon={<BoldOutlined />}
                type="text"
                onClick={() =>
                  properties.activeBox !== undefined &&
                  dispatch(
                    updateText({
                      index: properties.activeBox,
                      text: {
                        fontWeight:
                          properties.fontWeight === "normal"
                            ? "bold"
                            : "normal",
                      },
                    })
                  )
                }
              />
            </Tooltip>
            <Tooltip title="italic">
              <Button
                icon={<ItalicOutlined />}
                type="text"
                onClick={() =>
                  properties.activeBox !== undefined &&
                  dispatch(
                    updateText({
                      index: properties.activeBox,
                      text: {
                        fontStyle:
                          properties.fontStyle === "normal"
                            ? "italic"
                            : "normal",
                      },
                    })
                  )
                }
              />
            </Tooltip>
          </Space>
        </Space>
      </Space>
    </Space>
  );
}

export default StyleEditor;
