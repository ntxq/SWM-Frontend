import React from "react";
import { Image } from "antd";

function CropImage(properties) {
  return (
    <div className="crop">
      <Image src={properties.url} className="preview_image" />
    </div>
  );
}

export default CropImage;
