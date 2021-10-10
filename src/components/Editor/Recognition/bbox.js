import React from "react";
import { Rnd } from "react-rnd";
import { Typography } from "antd";

import { useDispatch } from "react-redux";
import {
  updateBbox,
  selectBbox,
  updateTranslateBox,
  selectTranslateBox,
} from "../../../contexts/recognition-slice";

function Bbox(properties) {
  const dispatch = useDispatch();

  return (
    <Rnd
      position={{
        x: properties.dimension[0],
        y: properties.dimension[1],
      }}
      size={{
        width: properties.dimension[2],
        height: properties.dimension[3],
      }}
      onDragStop={(event, data) =>
        dispatch(
          properties.original
            ? updateBbox({
                requestID: properties.requestID,
                cutIndex: properties.cutIndex,
                index: properties.index,
                updatedBbox: {
                  x: data.x,
                  y: data.y,
                },
              })
            : updateTranslateBox({
                requestID: properties.requestID,
                cutIndex: properties.cutIndex,
                index: properties.index,
                updatedBbox: {
                  x: data.x,
                  y: data.y,
                },
              })
        )
      }
      onResizeStop={(event, direction, reference, delta, position) => {
        dispatch(
          properties.original
            ? updateBbox({
                requestID: properties.requestID,
                cutIndex: properties.cutIndex,
                index: properties.index,
                updatedBbox: {
                  x: position.x,
                  y: position.y,
                  width: properties.dimension[2] + delta.width,
                  height: properties.dimension[3] + delta.height,
                },
              })
            : updateTranslateBox({
                requestID: properties.requestID,
                cutIndex: properties.cutIndex,
                index: properties.index,
                updatedBbox: {
                  x: position.x,
                  y: position.y,
                  width: properties.dimension[2] + delta.width,
                  height: properties.dimension[3] + delta.height,
                },
              })
        );
      }}
      onClick={(event) =>
        dispatch(
          properties.original
            ? selectBbox(properties.index)
            : selectTranslateBox(properties.index)
        )
      }
      onMouseDown={(event) => event.stopPropagation()}
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
        {properties.original || properties.text}
      </Typography.Text>
    </Rnd>
  );
}

export default Bbox;
