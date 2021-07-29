import React, { useEffect } from "react";
import { Col, Row, Steps } from "antd";

import RecognitionImage from "./recognition-image";
import BboxLayer from "./bbox-layer";
import RecognitionEditor from "./recognition-editor";

import useREcognitionResult from "./use-recognition-result";

function Recognition(properties) {
  const getResult = useREcognitionResult(properties.webtoon.id);

  useEffect(() => {
    getResult();
  }, [getResult]);

  return (
    <>
      <Steps current={1} className="editor_progress">
        <Steps.Step title="Segmentation" />
        <Steps.Step title="Recognition" />
        <Steps.Step title="Finish" />
      </Steps>
      <Row>
        <Col span={8}>
          <RecognitionImage
            src={properties.webtoon.original}
            index={properties.webtoon.id}
          />
          <BboxLayer original={true} index={properties.webtoon.id} />
        </Col>
        <Col span={8}>
          <RecognitionImage
            src={properties.webtoon.inpaint}
            index={properties.webtoon.id}
          />
          <BboxLayer original={false} index={properties.webtoon.id} />
        </Col>
        <Col span={8}>
          <RecognitionEditor index={properties.webtoon.id} />
        </Col>
      </Row>
    </>
  );
}

export default Recognition;
