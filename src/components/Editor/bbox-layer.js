import React from "react";

import { useSelector } from "react-redux";

import Bbox from "./bbox";

function BboxLayer(properties) {
  const bboxList = useSelector((state) =>
    properties.original
      ? state.recognition.bboxList
      : state.recognition.translationList
  );

  const textList = useSelector((state) => state.recognition.bboxText);

  return (
    <>
      {bboxList.map((box, index) => (
        <Bbox
          box={box}
          index={index}
          original={properties.original}
          text={textList[index][properties.original ? 0 : 1]}
          color={textList[index][2]}
          size={textList[index][3]}
          key={index}
        />
      ))}
    </>
  );
}

export default BboxLayer;
