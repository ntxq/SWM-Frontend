import React from "react";

import { useSelector } from "react-redux";

import Bbox from "./bbox";

function BboxLayer(properties) {
  const bboxList = useSelector((state) => state.recognition.bboxList);
  const activeBox = useSelector((state) => state.recognition.activeBox);

  return (
    <>
      {bboxList[properties.index] && bboxList[properties.index].map((box, index) => (
        <Bbox
          id={properties.index}
          index={index}
          dimension={
            properties.original
              ? [
                  box.originalX,
                  box.originalY,
                  box.originalWidth,
                  box.originalHeight,
                ]
              : [
                  box.translatedX,
                  box.translatedY,
                  box.translatedWidth,
                  box.translatedHeight,
                ]
          }
          original={properties.original}
          text={properties.original ? box.originalText : box.translatedText}
          color={box.fontColor}
          size={box.fontSize}
          font={box.fontFamily}
          weight={box.fontWeight}
          italic={box.fontStyle}
          active={activeBox === index}
          key={index}
        />
      ))}
    </>
  );
}

export default BboxLayer;
