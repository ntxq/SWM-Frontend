import React from "react";
import { Upload } from "antd";
import { PictureOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { uploadOriginal } from "../../contexts/webtoon-drop-slice";

import useUniquename from "./use-uniquename";

const { Dragger } = Upload;

function WebtoonDrop(properties) {
  const dispatch = useDispatch();
  const uniqueName = useUniquename();

  const defaultConfig = {
    accept: "image/*",
    multiple: true,
    showUploadList: false,
    async beforeUpload(file) {
      const uniqueFile = uniqueName(file);
      const objectURL = URL.createObjectURL(uniqueFile);
      dispatch(
        uploadOriginal({
          original: objectURL,
          inpaint: "",
          mask: [],
          filename: uniqueFile.name,
          id: "",
        })
      );
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
