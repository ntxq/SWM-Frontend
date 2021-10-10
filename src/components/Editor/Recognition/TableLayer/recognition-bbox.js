import React from "react";
import { Row, Col } from "antd";
import RecognitionImage from "../recognition-image";
import BboxLayer from "../bbox-layer";
import RecognitionTableBbox from "./recognition-table-bbox";
import RecognitionTableTranslate from "./recognition-table-translate";

function RecognitionBox({ src, requestID, cutIndex, submit, stage }) {
  return (
    <Row gutter={24}>
      <Col span={8} className="recognition_col">
        <RecognitionImage src={src} requestID={requestID} cutIndex={cutIndex} />
        <BboxLayer
          original={stage === "bbox"}
          requestID={requestID}
          cutIndex={cutIndex}
        />
      </Col>
      {stage === "bbox" ? (
        <RecognitionTableBbox
          requestID={requestID}
          cutIndex={cutIndex}
          submit={() => submit("translate")}
        />
      ) : (
        <RecognitionTableTranslate
          requestID={requestID}
          cutIndex={cutIndex}
          submit={() => submit("style")}
        />
      )}
    </Row>
  );
}

export default RecognitionBox;
