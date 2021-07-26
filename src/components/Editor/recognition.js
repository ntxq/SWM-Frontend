import React, { useState, useEffect } from "react";
import { Col, Row, Steps, Modal, Spin } from "antd";

import RecognitionImage from "./recognition-image";
import BboxLayer from "./bbox-layer";
import RecognitionEditor from "./recognition-editor";

function Recognition(properties) {
  const [isModalVisible, setIsModalVisible] = useState(true);

  useEffect(() => {
    if (properties.webtoon.translated) setIsModalVisible(false);
    else setIsModalVisible(true);
  }, [properties.webtoon.translated]);

  return (
    <>
      {/* <Modal
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
      </Modal> */}

      <Steps current={1} className="editor_progress">
        <Steps.Step title="Segmentation" />
        <Steps.Step title="Recognition" />
        <Steps.Step title="Finish" />
      </Steps>
      <Row>
        <Col span={8}>
          <RecognitionImage src={properties.webtoon.original} />
          <BboxLayer original={true} />
        </Col>
        <Col span={8}>
          <RecognitionImage src={properties.webtoon.inpaint} />
          <BboxLayer original={false} />
        </Col>
        <Col span={8}>
          <RecognitionEditor />
        </Col>
      </Row>
    </>
  );
}

export default Recognition;
