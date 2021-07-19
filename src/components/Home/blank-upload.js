import React from "react";
import { Upload } from "antd";

import { useDispatch } from "react-redux";
import { singleInpaint } from "../../contexts/webtoon-drop-slice";

import CropImage from "./crop-image";

const { Dragger } = Upload;

function BlankUpload(properties) {
  const dispatch = useDispatch();

  const defaultConfig = {
    accept: "image/*",
    maxCount: 1,
    showUploadList: false,
    async beforeUpload(file) {
      dispatch(singleInpaint([properties.index, URL.createObjectURL(file)]));
    },
  };

  return (
    <>
      {properties.inpaint ? (
        <CropImage url={properties.inpaint} />
      ) : (
        <Dragger {...defaultConfig} className="blank_upload">
          <p>Please upload a blank webtoon</p>
        </Dragger>
      )}
    </>
  );
}

export default BlankUpload;
