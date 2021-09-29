import { Input, Typography } from "antd";
import React from "react";

function PreferenceBlock(properties) {
  return (
    <div className="preference_block">
      <Typography.Title level={5}>{properties.title}</Typography.Title>
      <Input
        defaultValue={properties.defaultValue}
        onChange={(event) => properties.onChange(event.target.value)}
        className="preference_input"
      />
      <br />
      <Typography.Text type="secondary">
        {properties.description}
      </Typography.Text>
    </div>
  );
}

export default PreferenceBlock;
