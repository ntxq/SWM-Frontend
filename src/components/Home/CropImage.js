import React from "react";
import { Image } from "antd";

function CropImage(props) {
  return (
    <div className="crop">
      <Image src={props.url} className="preview_image" />
    </div>
  );
}

export default CropImage;