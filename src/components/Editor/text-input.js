import React from "react";
import { Typography, Input, Divider } from "antd";

import { useDispatch } from "react-redux";
import { updateText } from "../../contexts/recognition-slice";

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
            updateText({
              index: properties.activeBox,
              text: properties.original
                ? {
                    original: event.target.value,
                  }
                : {
                    translated: event.target.value,
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
