import React from "react";
import { useSelector } from "react-redux";
import { Image } from "antd";

function Preview(props) {
  const webtoons = useSelector((state) => state.webtoon.images);

  return (
    <>
      {webtoons.map((url) => (
        <Image src={url} />
      ))}
    </>
  );
}

export default Preview;
