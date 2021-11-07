import React from "react";
import { Row } from "antd";

import DownloadCard from "./download-card";
import useDownloadImage from "./use-download-image";

function Download(properties) {
  const downloadImages = useDownloadImage();

  return (
    <Row>
      {downloadImages.map((url, index) => (
        <DownloadCard key={index} source={url} index={index} />
      ))}
    </Row>
  );
}

export default Download;
