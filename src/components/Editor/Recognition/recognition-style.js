import React from "react";
import { Col } from "antd";

import RecognitionImage from "./recognition-image";
import BboxLayer from "./bbox-layer";
import RecognitionEditor from "./recognition-editor";

function RecognitionStyle(properties) {
  return (
    <>
      <Col span={8} className="recognition_col recognition_style">
        <RecognitionImage
          src={properties.src}
          requestID={properties.requestID}
          cutIndex={properties.cutIndex}
        />
        <BboxLayer
          original={false}
          requestID={properties.requestID}
          cutIndex={properties.cutIndex}
        />
      </Col>
      <Col span={8}>
        <RecognitionEditor
          requestID={properties.requestID}
          cutIndex={properties.cutIndex}
        />
      </Col>
    </>
  );
}

export default RecognitionStyle;
