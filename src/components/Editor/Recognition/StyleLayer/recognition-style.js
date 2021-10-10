import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";

import RecognitionImage from "../recognition-image";
import BboxLayer from "../bbox-layer";
import RecognitionEditor from "./recognition-editor";

function RecognitionStyle(properties) {
  const [imageSource, setImageSource] = useState();

  useEffect(() => {
    fetch(properties.src)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((url) =>
        setImageSource((previusImage) => {
          URL.revokeObjectURL(previusImage);
          return url;
        })
      );

    return () => {
      setImageSource((previusImage) => {
        URL.revokeObjectURL(previusImage);
        return "";
      });
    };
  }, [properties.src]);

  return (
    <Row gutter={24}>
      <Col span={8} className="recognition_col recognition_style">
        <RecognitionImage
          src={properties.src}
          requestID={properties.requestID}
          cutIndex={properties.cutIndex}
        />
        <BboxLayer
          original={true}
          requestID={properties.requestID}
          cutIndex={properties.cutIndex}
        />
      </Col>

      <Col span={8} className="recognition_col recognition_style">
        <RecognitionImage
          src={imageSource}
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
    </Row>
  );
}

export default RecognitionStyle;
