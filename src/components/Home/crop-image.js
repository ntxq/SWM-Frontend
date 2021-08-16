import React, { useEffect, useRef, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";

import ModalImage from "./modal-image";
import { Space } from "antd";

function CropImage(properties) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const canvasReference = useRef();

  const closeModal = () => setIsModalVisible(false);
  const openModal = () => setIsModalVisible(true);

  useEffect(() => {
    const image = new Image(properties.url);
    image.src = properties.url;

    const canvas = canvasReference.current;
    const context = canvas.getContext("2d");

    function cropImage() {
      const widthScale = context.canvas.width / image.naturalWidth;

      context.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        context.canvas.height / widthScale,
        0,
        0,
        context.canvas.width,
        context.canvas.height
      );
    }

    image.addEventListener("load", cropImage);

    return () => image.removeEventListener("load", cropImage);
  }, [canvasReference, properties.url]);

  return (
    <div className="crop_home">
      <canvas ref={canvasReference} className="preview_image" />
      <div onClick={openModal} className="preview_mask ant-image-mask">
        <Space>
          <EyeOutlined />
          Preview Image
        </Space>
      </div>
      <ModalImage
        url={properties.url}
        isModalVisible={isModalVisible}
        closeModal={closeModal}
      />
    </div>
  );
}

export default CropImage;
