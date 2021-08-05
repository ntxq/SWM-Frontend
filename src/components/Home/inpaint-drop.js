import React from "react";
import { Upload, message } from "antd";
import { BsChat } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { updateWebtoon } from "../../contexts/webtoon-drop-slice";

const { Dragger } = Upload;

function rejectDrop() {
  message.info(
    "원본 이미지와 동일한 이름을 가진 공백 이미지만 업로드 가능합니다."
  );
}

function InpaintDrop(properties) {
  const images = useSelector((state) => state.webtoons.images);
  const dispatch = useDispatch();

  const defaultConfig = {
    accept: "image/*",
    multiple: true,
    showUploadList: false,
    async beforeUpload(file) {
      const index = images.findIndex((image) => image.filename === file.name);
      if (index !== -1)
        dispatch(
          updateWebtoon({
            index,
            webtoon: {
              inpaint: URL.createObjectURL(file),
            },
          })
        );
      else rejectDrop();
      return false;
    },
  };

  return (
    <Dragger {...defaultConfig}>
      <p className="ant-upload-drag-icon">
        <BsChat color="#40a9ff" size="3em" />
      </p>
      <p className="ant-upload-text">
        Upload text-erased webtoon images (Optional)
      </p>
    </Dragger>
  );
}

export default InpaintDrop;
