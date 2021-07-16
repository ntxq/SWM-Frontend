import React from "react";

import { useSelector } from "react-redux";

import Bbox from "./bbox";

function BboxLayer(properties) {
  const bboxList = useSelector((state) =>
    properties.original
      ? state.recognition.bboxList
      : state.recognition.translationList
  );

  return (
    <>
      {bboxList.map((box, index) => (
        <Bbox box={box} index={index} original={properties.original} key={index} />
      ))}
    </>
  );
}

export default BboxLayer;
