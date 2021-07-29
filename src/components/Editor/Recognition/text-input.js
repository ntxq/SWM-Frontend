import React from "react";
import { Typography, Input, Divider } from "antd";

import { useDispatch } from "react-redux";
import { updateBbox } from "../../../contexts/recognition-slice";

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
            updateBbox({
              id: properties.index,
              index: properties.activeBox,
              updatedBbox: properties.original
                ? {
                    originalText: event.target.value,
                  }
                : {
                    translatedText: event.target.value,
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
