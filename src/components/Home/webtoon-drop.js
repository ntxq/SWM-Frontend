import React from "react";
import { Upload } from "antd";
import { BsChatDots } from "react-icons/bs";

import { useDispatch } from "react-redux";
import { uploadWebtoon } from "../../contexts/webtoon-drop-slice";

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
        uploadWebtoon({
          original: objectURL,
          filename: uniqueFile.name,
        })
      );
      return false;
    },
  };

  return (
    <Dragger {...defaultConfig}>
      <p className="ant-upload-drag-icon">
        <BsChatDots color="#40a9ff" size="3em" />
      </p>
      <p className="ant-upload-text">
        Upload original webtoon images to translate (Required)
      </p>
    </Dragger>
  );
}

export default WebtoonDrop;
