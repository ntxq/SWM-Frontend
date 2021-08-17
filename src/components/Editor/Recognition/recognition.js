import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";

import ModalLoading from "../../Common/modal-loading";

import RecognitionImage from "./recognition-image";
import BboxLayer from "./bbox-layer";
import RecognitionEditor from "./recognition-editor";

import useRecognitionResult from "./use-recognition-result";
import EditorProgress from "../editor-progress";

function Recognition(properties) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const bboxList = useSelector(
    (state) =>
      state.recognition.bboxList[properties.webtoon.id][properties.cutIndex]
  );

  const [getOCRResult, cancelResult] = useRecognitionResult(
    properties.webtoonIndex,
    properties.cutIndex
  );

  useEffect(() => {
    if (bboxList.length > 0 && isModalVisible) setIsModalVisible(false);
    else if (bboxList.length === 0 && isModalVisible) getOCRResult();
  }, [getOCRResult, bboxList.length, isModalVisible]);

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
      <Row gutter={24}>
        <Col span={8} className="recognition_col">
          <RecognitionImage
            src={properties.webtoon.original}
            requestID={properties.webtoon.id}
            cutIndex={properties.cutIndex}
          />
          <BboxLayer
            original={true}
            requestID={properties.webtoon.id}
            cutIndex={properties.cutIndex}
          />
        </Col>
        <Col span={8} className="recognition_col">
          <RecognitionImage
            src={properties.webtoon.inpaint}
            requestID={properties.webtoon.id}
            cutIndex={properties.cutIndex}
          />
          <BboxLayer
            original={false}
            requestID={properties.webtoon.id}
            cutIndex={properties.cutIndex}
          />
        </Col>
        <Col span={8} className="editor_col">
          <RecognitionEditor
            requestID={properties.webtoon.id}
            cutIndex={properties.cutIndex}
          />
        </Col>
      </Row>
    </>
  );
}

export default Recognition;
