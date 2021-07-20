import React from "react";
import { Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { deleteBox } from "../../contexts/recognition-slice";

function EditorButtons(properties) {
  const dispatch = useDispatch();

  return (
    <Space>
      <Button
        type="primary"
        icon={<DeleteOutlined />}
        onClick={() => dispatch(deleteBox(properties.activeBox))}
      />
      <Button
        type="primary"
        icon={<DeleteOutlined />}
        danger
        onClick={() => dispatch(deleteBox())}
      />
      <Button type="primary">Submit All</Button>
    </Space>
  );
}

export default EditorButtons;
