import React from "react";
import { Col, Image } from "antd";
import { saveAs } from "file-saver";

function DownloadCard({ source, index }) {
  return (
    <Col xs={24} sm={12} md={8} lg={6} className="download_container">
      <Image
        src={source}
        preview={false}
        onClick={() => {
          saveAs(source, `${index + 1}.png`);
        }}
        className="download_image"
      />
    </Col>
  );
}

export default DownloadCard;
