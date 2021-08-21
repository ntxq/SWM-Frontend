import React from "react";
import { Image, Modal } from "antd";

function ModalImage(properties) {
  return (
    <Modal
      visible={properties.isModalVisible}
      footer={false}
      closable={false}
      onCancel={properties.closeModal}
    >
      <Image src={properties.url} preview={false} />
    </Modal>
  );
}

export default ModalImage;
