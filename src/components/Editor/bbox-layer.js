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
  const activeBox = useSelector((state) => state.recognition.activeBox);

  return (
    <>
      {bboxList.map((box, index) => (
        <Bbox
          box={box}
          index={index}
          original={properties.original}
          text={
            properties.original
              ? textList[index].original
              : textList[index].translated
          }
          color={textList[index].fontColor}
          size={textList[index].fontSize}
          active={activeBox === index}
          key={index}
        />
      ))}
    </>
  );
}

export default BboxLayer;
