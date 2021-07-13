import React from "react";
import { Upload } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import { useDispatch } from "react-redux";
import { upload } from "../../contexts/webtoonDropSlice";

const { Dragger } = Upload;

function WebtoonDrop(props) {
  const dispatch = useDispatch();

  const defaultConfig = {
    accept: "image/*",
    multiple: true,
    directory: true,
    showUploadList: false,
    async beforeUpload(file) {
      const objectURL = URL.createObjectURL(file);
      dispatch(upload([objectURL, file.name, ""]));
      return false;
    },
  };

  return (
    <Dragger {...defaultConfig}>
      <p className="ant-upload-drag-icon">
        <PictureOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files
      </p>
    </Dragger>
  );
}

export default WebtoonDrop;
