import React, { useCallback, useEffect, useState } from "react";
import { Button, Space, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import {
  deleteBbox,
  deleteTranslateBox,
} from "../../../contexts/recognition-slice";

function EditorButtons(properties) {
  const dispatch = useDispatch();

  const deleteAction = useCallback(
    (target) =>
      properties.context === "bbox"
        ? deleteBbox({
            requestID: properties.requestID,
            bboxID: properties.cutIndex,
            target: properties.activeBox,
          })
        : deleteTranslateBox({
            requestID: properties.requestID,
            cutIndex: properties.cutIndex,
            target: properties.activeBox,
          }),
    [
      properties.context,
      properties.requestID,
      properties.cutIndex,
      properties.activeBox,
    ]
  );

  return (
    <Space>
      <Tooltip title="Delete the selected box">
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          onClick={() => dispatch(deleteAction(properties.activeBox))}
        />
      </Tooltip>
      <Tooltip title="Delete all box">
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          danger
          onClick={() => dispatch(deleteAction())}
        />
      </Tooltip>
      <Button type="primary" onClick={properties.backward}>
        Previous
      </Button>
      <Button type="primary" onClick={properties.submit}>
        Next
      </Button>
    </Space>
  );
}

export default EditorButtons;
