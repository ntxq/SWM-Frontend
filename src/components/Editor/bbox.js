import React from "react";
import { Typography } from "antd";

function Bbox(properties) {
  return (
    <Typography.Text
      className="bbox"
      style={{
        top: properties.box[1],
        left: properties.box[0],
      }}
    >
      Ant Design
    </Typography.Text>
  );
}

export default Bbox;
