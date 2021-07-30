import React from "react";
import { Button, Space, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { deleteBox } from "../../../contexts/recognition-slice";

import useUploadEdit from "./use-upload-edit";

function EditorButtons(properties) {
  const dispatch = useDispatch();
  const uploadEdit = useUploadEdit(properties.index);

  return (
    <Space>
      <Tooltip title="Delete the selected box">
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          onClick={() =>
            dispatch(
              deleteBox({
                id: properties.index,
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
          onClick={() => dispatch(deleteBox({ id: properties.index }))}
        />
      </Tooltip>
      <Button type="primary" onClick={uploadEdit}>
        Submit All
      </Button>
    </Space>
  );
}

export default EditorButtons;
