import React, { useEffect, useState } from "react";
import { Col, Row, Steps, Modal, Spin } from "antd";
import { useSelector } from "react-redux";

import RecognitionImage from "./recognition-image";
import BboxLayer from "./bbox-layer";

import RecognitionStyle from "./recognition-style";
import RecognitionTable from "./recognition-table";

import useRecognitionResult from "./use-recognition-result";

function Recognition(properties) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isTableVisible, setIsTableVisible] = useState(true);
  const bboxList = useSelector(
    (state) => state.recognition.bboxList[properties.webtoon.id]
  );

  const getOCRResult = useRecognitionResult(properties.webtoon.id);

  useEffect(() => {
    if (Array.isArray(bboxList)) setIsModalVisible(false);
    else getOCRResult();
  }, [getOCRResult, bboxList]);

  return (
    <>
      <Modal
        visible={isModalVisible}
        centered
        closable={false}
        destroyOnClose={true}
        // eslint-disable-next-line unicorn/no-null
        footer={null}
        maskClosable={false}
        style={{
          background: "rgba(100, 0, 0, 0)",
        }}
        bodyStyle={{
          background: "rgba(0, 0, 0, 0)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </Modal>

      <Steps current={1} className="editor_progress">
        <Steps.Step title="Segmentation" />
        <Steps.Step title="Recognition" />
        <Steps.Step title="Finish" />
      </Steps>

      <Row gutter={24}>
        <Col span={8} className="recognition_col">
          <RecognitionImage
            src={properties.webtoon.original}
            index={properties.webtoon.id}
          />
          <BboxLayer original={true} index={properties.webtoon.id} />
        </Col>
        {isTableVisible ? (
          <RecognitionTable index={properties.webtoon.id} />
        ) : (
          <RecognitionStyle webtoon={properties.webtoon} />
        )}
      </Row>
    </>
  );
}

export default Recognition;
