import React from "react";
import { Button } from "antd";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";

function PreferenceControl(properties) {
  return (
    <div className="preference_save">
      <Button
        type="primary"
        icon={<SaveOutlined />}
        onClick={properties.submitChange}
      />
      <Button icon={<DeleteOutlined />} />
    </div>
  );
}

export default PreferenceControl;
