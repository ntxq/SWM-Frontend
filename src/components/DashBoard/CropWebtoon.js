import React from "react";
import { Image } from "antd";

function CropWebtoon(props) {
  return (
    <div className="crop">
      <Image src={props.url} className="preview_image" />
    </div>
  );
}

export default CropWebtoon;
