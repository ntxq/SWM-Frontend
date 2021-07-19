import React from "react";
import { Image } from "antd";

function CropWebtoon(properties) {
  return (
    <div className="crop">
      <Image src={properties.url} preview={false} />
    </div>
  );
}

export default CropWebtoon;
