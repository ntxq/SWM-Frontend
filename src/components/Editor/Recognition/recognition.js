import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";

import ModalLoading from "../../Common/modal-loading";
import loadingText from "../../Common/loading-text";

import RecognitionImage from "./recognition-image";
import BboxLayer from "./bbox-layer";
import RecognitionEditor from "./recognition-editor";

import useRecognitionResult from "./use-recognition-result";
import EditorProgress from "../editor-progress";

function Recognition(properties) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const bboxList = useSelector(
    (state) => state.recognition.bboxList[properties.webtoon.id]
  );

  const [getOCRResult, cancelResult] = useRecognitionResult(
    properties.webtoon.id
  );

  useEffect(() => {
    if (Array.isArray(bboxList)) setIsModalVisible(false);
    else getOCRResult();
  }, [getOCRResult, bboxList]);

  return (
    <>
      <ModalLoading
        loading={isModalVisible}
        cancel={() => {
          cancelResult(true);
          setIsModalVisible(false);
        }}
        tip={loadingText[properties.webtoon.progress]}
      />

      <EditorProgress current={1} />
      <Row gutter={24}>
        <Col span={8} className="recognition_col">
          <RecognitionImage
            src={properties.webtoon.original}
            index={properties.webtoon.id}
          />
          <BboxLayer original={true} index={properties.webtoon.id} />
        </Col>
        <Col span={8} className="recognition_col">
          <RecognitionImage
            src={properties.webtoon.inpaint}
            index={properties.webtoon.id}
          />
          <BboxLayer original={false} index={properties.webtoon.id} />
        </Col>
        <Col span={8} className="editor_col">
          <RecognitionEditor index={properties.webtoon.id} />
        </Col>
      </Row>
    </>
  );
}

export default Recognition;
