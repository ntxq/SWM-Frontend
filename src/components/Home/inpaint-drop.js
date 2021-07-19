import React from "react";
import { Upload, message } from "antd";
import { PictureOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { singleInpaint } from "../../contexts/webtoon-drop-slice";

const { Dragger } = Upload;

function rejectDrop() {
  message.info(
    "원본 이미지와 동일한 이름을 가진 공백 이미지만 업로드 가능합니다."
  );
}

function InpaintDrop(properties) {
  const webtoons = useSelector((state) => state.webtoons.images);
  const dispatch = useDispatch();

  const defaultConfig = {
    accept: "image/*",
    multiple: true,
    showUploadList: false,
    async beforeUpload(file) {
      const index = webtoons.findIndex((item) => item[1] === file.name);
      if (index !== -1)
        dispatch(singleInpaint([index, URL.createObjectURL(file)]));
      else rejectDrop();
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

export default InpaintDrop;
