import React from "react";
import { Rnd } from "react-rnd";
import { Typography } from "antd";

import { useDispatch } from "react-redux";
import {
  updateLocation,
  updateSize,
  selectBox,
} from "../../contexts/recognition-slice";

function Bbox(properties) {
  const dispatch = useDispatch();

  return (
    <Rnd
      position={{
        x: properties.box[0],
        y: properties.box[1],
      }}
      size={{
        width: properties.box[2],
        height: properties.box[3],
      }}
      onDragStop={(event, data) =>
        dispatch(
          updateLocation([
            properties.original,
            properties.index,
            [data.x, data.y],
          ])
        )
      }
      onResizeStop={(event, direction, reference, delta, position) =>
        dispatch(
          updateSize([
            properties.original,
            properties.index,
            [
              Number(reference.style.width.slice(0, -2)),
              Number(reference.style.height.slice(0, -2)),
            ],
          ])
        )
      }
      onClick={(event) => dispatch(selectBox(properties.index))}
      bounds="parent"
      style={{ borderColor: properties.active ? "red" : "#ffa940" }}
      className="bbox"
    >
      <Typography.Text
        style={{
          color: properties.color,
          fontSize: properties.size,
          fontFamily: properties.font,
          fontWeight: properties.weight,
          fontStyle: properties.italic,
        }}
        className="bbox_text"
      >
        {properties.text}
      </Typography.Text>
    </Rnd>
  );
}

export default Bbox;
