import { Modal, Space, Spin, Typography, Button } from "antd";
import React from "react";

function ModalLoading(properties) {
  return (
    <Modal
      visible={properties.loading}
      centered
      closable={false}
      destroyOnClose={true}
      // eslint-disable-next-line unicorn/no-null
      footer={null}
      maskClosable={false}
      maskStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
      bodyStyle={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Spin
        size="large"
        tip={
          <Space direction="vertical">
            <Typography.Text strong className="loading_tip">
              {properties.tip}
            </Typography.Text>
            <Button danger ghost type="primary" onClick={properties.cancel}>
              Cancel
            </Button>
          </Space>
        }
      />
    </Modal>
  );
}

export default ModalLoading;
