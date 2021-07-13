import React from "react";
import { Upload } from "antd";

import { useDispatch } from "react-redux";
import { singleInpaint } from "../../contexts/webtoonDropSlice";

import CropImage from "./CropImage";

const { Dragger } = Upload;

function BlankUpload(props) {
  const dispatch = useDispatch();

  const defaultConfig = {
    accept: "image/*",
    maxCount: 1,
    showUploadList: false,
    async beforeUpload(file) {
      dispatch(singleInpaint([props.index, URL.createObjectURL(file)]));
    },
  };

  return (
    <>
      {props.inpaint ? (
        <CropImage url={props.inpaint} />
      ) : (
        <Dragger {...defaultConfig} className="blank_upload">
          <p>Please upload a blank webtoon</p>
        </Dragger>
      )}
    </>
  );
}

export default BlankUpload;
