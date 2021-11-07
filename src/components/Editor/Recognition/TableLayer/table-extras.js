import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { GroupOutlined, OrderedListOutlined } from "@ant-design/icons";
import { Button, InputNumber, Space, Tooltip } from "antd";

function TableExtras(properties) {
  const [openCluster, setOpenCluster] = useState(false);
  const [openIndex, setOpenIndex] = useState(false);
  const dispatch = useDispatch();

  return (
    <Space>
      {openCluster && (
        <InputNumber
          value={properties.cluster}
          min={0}
          onChange={(newCluster) => {
            dispatch(properties.updateCluster(newCluster));
            dispatch(properties.select(properties.originalIndex));
          }}
        />
      )}
      <Tooltip title="Change cluster">
        <Button
          icon={<GroupOutlined />}
          onClick={() => setOpenCluster((state) => !state)}
        />
      </Tooltip>

      {openIndex && (
        <InputNumber
          value={properties.index}
          min={0}
          onChange={(newIndex) => {
            dispatch(properties.updateIndex(newIndex));
            dispatch(properties.select(properties.originalIndex));
          }}
        />
      )}
      <Tooltip title="Change index">
        <Button
          icon={<OrderedListOutlined />}
          onClick={() => setOpenIndex(() => setOpenIndex((state) => !state))}
        />
      </Tooltip>
    </Space>
  );
}

export default TableExtras;
