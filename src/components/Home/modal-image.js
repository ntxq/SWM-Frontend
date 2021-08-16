import { Image, Modal } from "antd";
import React from "react";

function ModalImage(properties) {
  return (
    <Modal
      visible={properties.isModalVisible}
      // eslint-disable-next-line unicorn/no-null
      footer={null}
      closable={false}
      onCancel={properties.closeModal}
    >
      <Image src={properties.url} preview={false} />
    </Modal>
  );
}

export default ModalImage;
