import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ModalLoading from "../../Common/modal-loading";
import EditorProgress from "../editor-progress";
import useRecognitionResult from "./use-recognition-result";

import RecognitionBox from "./TableLayer/recognition-bbox";
import RecognitionStyle from "./StyleLayer/recognition-style";

function Recognition(properties) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [recognitionStage, setRecognitionStage] = useState("bbox");
  const bboxListLength = useSelector(
    (state) =>
      state.recognition.bboxList[properties.webtoon.id][properties.cutIndex]
        .length
  );

  const [getOCRResult, cancelResult] = useRecognitionResult(
    properties.webtoonIndex,
    properties.cutIndex
  );

  useEffect(() => {
    if (bboxListLength > 0 && isModalVisible) setIsModalVisible(false);
    else if (bboxListLength === 0 && isModalVisible) getOCRResult();
  }, [getOCRResult, bboxListLength, isModalVisible]);

  return (
    <>
      <ModalLoading
        visible={isModalVisible}
        cancel={() => {
          cancelResult(true);
          setIsModalVisible(false);
        }}
        progress={properties.webtoon.progress}
      />

      <EditorProgress current={1} />
      {recognitionStage !== "style" && (
        <RecognitionBox
          src={properties.webtoon.original}
          requestID={properties.webtoon.id}
          cutIndex={properties.cutIndex}
          submit={(nextStage) => setRecognitionStage(nextStage)}
          stage={recognitionStage}
        />
      )}
      {recognitionStage === "style" && (
        <RecognitionStyle
          src={properties.webtoon.original}
          requestID={properties.webtoon.id}
          cutIndex={properties.cutIndex}
        />
      )}
    </>
  );
}

export default Recognition;
