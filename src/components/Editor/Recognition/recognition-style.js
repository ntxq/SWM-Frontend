import React from "react";
import { Col } from "antd";

import RecognitionImage from "./recognition-image";
import BboxLayer from "./bbox-layer";
import RecognitionEditor from "./recognition-editor";

function RecognitionStyle(properties) {
  return (
    <>
      <Col span={8} className="recognition_col">
        <RecognitionImage
          src={properties.webtoon.inpaint}
          index={properties.webtoon.id}
        />
        <BboxLayer original={false} index={properties.webtoon.id} />
      </Col>
      <Col span={8}>
        <RecognitionEditor index={properties.webtoon.id} />
      </Col>
    </>
  );
}

export default RecognitionStyle;
