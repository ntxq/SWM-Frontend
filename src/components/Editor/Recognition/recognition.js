import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectBox } from "../../../contexts/recognition-slice";

import ModalLoading from "../../Common/modal-loading";
import EditorProgress from "../editor-progress";

import RecognitionImage from "./recognition-image";
import BboxLayer from "./bbox-layer";
import RecognitionStyle from "./recognition-style";
import RecognitionTable from "./recognition-table";

import useRecognitionResult from "./use-recognition-result";

function Recognition(properties) {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isTableVisible, setIsTableVisible] = useState(true);
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

  useEffect(() => {
    return () => {
      dispatch(selectBox());
    };
  }, [dispatch]);

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
        {isTableVisible ? (
          <RecognitionTable
            requestID={properties.webtoon.id}
            cutIndex={properties.cutIndex}
            submit={() => setIsTableVisible(false)}
          />
        ) : (
          <RecognitionStyle
            src={properties.webtoon.inpaint}
            requestID={properties.webtoon.id}
            cutIndex={properties.cutIndex}
          />
        )}
      </Row>
    </>
  );
}

export default Recognition;
