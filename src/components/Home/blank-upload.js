import React from "react";
import { Upload } from "antd";

import { useDispatch } from "react-redux";
import { updateWebtoon } from "../../contexts/webtoon-drop-slice";

import CropImage from "./crop-image";

const { Dragger } = Upload;

function BlankUpload(properties) {
  const dispatch = useDispatch();

  const defaultConfig = {
    accept: "image/*",
    maxCount: 1,
    showUploadList: false,
    beforeUpload(file) {
      dispatch(
        updateWebtoon({
          index: properties.index,
          webtoon: { inpaint: URL.createObjectURL(file) },
        })
      );
    },
  };

  return (
    <>
      {properties.inpaint ? (
        <CropImage url={properties.inpaint} />
      ) : (
        <Dragger {...defaultConfig} className="blank_upload">
          <p>Please upload a blank webtoon (Optional)</p>
        </Dragger>
      )}
    </>
  );
}

export default BlankUpload;
