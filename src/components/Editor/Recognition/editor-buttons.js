import React from "react";
import { Button, Space, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { deleteBbox } from "../../../contexts/recognition-slice";

function EditorButtons(properties) {
  const dispatch = useDispatch();

  return (
    <Space>
      <Tooltip title="Delete the selected box">
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          onClick={() =>
            dispatch(
              deleteBbox({
                requestID: properties.requestID,
                cutIndex: properties.cutIndex,
                target: properties.activeBox,
              })
            )
          }
        />
      </Tooltip>
      <Tooltip title="Delete all box">
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          danger
          onClick={() =>
            dispatch(
              deleteBbox({
                requestID: properties.requestID,
                cutIndex: properties.cutIndex,
              })
            )
          }
        />
      </Tooltip>
      <Button type="primary" onClick={properties.submit}>
        Submit All
      </Button>
    </Space>
  );
}

export default EditorButtons;
