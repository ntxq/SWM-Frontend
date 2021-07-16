import React from "react";

import { useSelector } from "react-redux";

import Bbox from "./bbox";

function BboxLayer(properties) {
  const bboxList = useSelector((state) => state.recognition.bboxList);

  return (
    <>
      {bboxList.map((box, index) => (
        <Bbox box={box} key={index} />
      ))}
    </>
  );
}

export default BboxLayer;
