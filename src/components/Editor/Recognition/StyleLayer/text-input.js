import React from "react";
import { Typography, Input, Divider } from "antd";

import { useDispatch } from "react-redux";
import {
  updateBbox,
  updateTranslateBox,
} from "../../../../contexts/recognition-slice";

function TextInput(properties) {
  const dispatch = useDispatch();

  return (
    <>
      <Typography.Title level={5}>{properties.title}</Typography.Title>
      <Input.TextArea
        value={properties.text}
        onChange={(event) =>
          properties.activeBox !== undefined &&
          dispatch(
            properties.original
              ? updateBbox({
                  requestID: properties.requestID,
                  cutIndex: properties.cutIndex,
                  index: properties.activeBox,
                  updatedBox: {
                    text: event.target.value,
                  },
                })
              : updateTranslateBox({
                  requestID: properties.requestID,
                  cutIndex: properties.cutIndex,
                  index: properties.activeBox,
                  updatedBox: {
                    text: event.target.value,
                  },
                })
          )
        }
      />
      <Divider />
    </>
  );
}

export default TextInput;
