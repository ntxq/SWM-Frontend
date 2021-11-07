import React from "react";

import { useSelector } from "react-redux";

import Bbox from "./bbox";

function BboxLayer(properties) {
  const boxList = useSelector((state) =>
    properties.original
      ? state.recognition.bboxList[properties.requestID][properties.cutIndex]
      : state.recognition.translateBoxList[properties.requestID][
          properties.cutIndex
        ]
  );

  const activeBox = useSelector((state) =>
    properties.original
      ? state.recognition.activeBbox
      : state.recognition.activeTranslateBox
  );

  const matchedContext = useSelector((state) =>
    properties.original
      ? state.recognition.currentContext === "bbox"
      : state.recognition.currentContext === "translate"
  );

  return (
    <>
      {boxList.map((box, index) => (
        <Bbox
          requestID={properties.requestID}
          cutIndex={properties.cutIndex}
          index={index}
          dimension={[box.x, box.y, box.width, box.height]}
          original={properties.original}
          text={properties.display && box.text}
          color={box.fontColor}
          size={box.fontSize}
          font={box.fontFamily}
          weight={box.fontWeight}
          italic={box.fontStyle}
          stroke={box.fontStroke}
          active={activeBox === index && matchedContext}
          key={index}
        />
      ))}
    </>
  );
}

export default BboxLayer;
