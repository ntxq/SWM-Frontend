import { Modal, Space, Button, Progress } from "antd";
import React from "react";

function ModalLoading(properties) {
  return (
    <Modal
      visible={properties.visible}
      centered
      closable={false}
      destroyOnClose={true}
      // eslint-disable-next-line unicorn/no-null
      footer={null}
      maskClosable={false}
      maskStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.75)",
      }}
      bodyStyle={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Space direction="vertical">
        <Progress type="circle" percent={properties.progress} />
        <Button
          danger
          ghost
          type="primary"
          onClick={properties.cancel}
          className="progress_cancel"
        >
          Cancel
        </Button>
      </Space>
    </Modal>
  );
}

export default ModalLoading;
