import React from "react";
import { Image } from "antd";

function WebtoonEditor(properties) {
  return (
    <>
      <Image src={properties.webtoon[0]} />
      <Image src={properties.webtoon[2]} />
    </>
  );
}

export default WebtoonEditor;
