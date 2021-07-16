import React from "react";
import { Col, Row, Steps } from "antd";

import RecognitionImage from "./recognition-image";
import BboxLayer from "./bbox-layer";
import RecognitionEditor from "./recognition-editor";

function Recognition(properties) {
  return (
    <>
      <Steps current={1} className="editor_progress">
        <Steps.Step title="Segmentation" />
        <Steps.Step title="Recognition" />
        <Steps.Step title="Finish" />
      </Steps>
      <Row>
        <Col span={8}>
          <RecognitionImage src={properties.webtoon[0]} />
          <BboxLayer original={true} />
        </Col>
        <Col span={8}>
          <RecognitionImage src={properties.webtoon[2]} />
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
