import React, { useState } from "react";
import { Image, Modal } from "antd";

function CropImage(properties) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <div className="crop">
      <Image
        src={properties.url}
        onClick={showModal}
        preview={{
          visible: false,
          maskClassName: "preview_mask",
        }}
        className="preview_image"
      />
      <Modal
        visible={isModalVisible}
        // eslint-disable-next-line unicorn/no-null
        footer={null}
        closable={false}
        onCancel={closeModal}
      >
        <Image src={properties.url} preview={false} />
      </Modal>
    </div>
  );
}

export default CropImage;
