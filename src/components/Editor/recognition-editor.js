import React from "react";
import { Button, Card, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { deleteAll } from "../../contexts/recognition-slice";

function RecognitionEditor(properties) {
  const dispatch = useDispatch();

  return (
    <Card>
      <Space>
        Text Editor
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          danger
          onClick={() => dispatch(deleteAll())}
        />
      </Space>
    </Card>
  );
}

export default RecognitionEditor;
