import React from "react";
import { Rnd } from "react-rnd";
import { Typography } from "antd";

import { useDispatch } from "react-redux";
import { updateBbox, selectBox } from "../../../contexts/recognition-slice";

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
          updateBbox({
            requestID: properties.requestID,
            cutIndex: properties.cutIndex,
            index: properties.index,
            updatedBbox: properties.original
              ? {
                  originalX: data.x,
                  originalY: data.y,
                }
              : {
                  translatedX: data.x,
                  translatedY: data.y,
                },
          })
        )
      }
      onResizeStop={(event, direction, reference, delta, position) => {
        dispatch(
          updateBbox({
            requestID: properties.requestID,
            cutIndex: properties.cutIndex,
            index: properties.index,
            updatedBbox: properties.original
              ? {
                  originalX: position.x,
                  originalY: position.y,
                  originalWidth: properties.dimension[2] + delta.width,
                  originalHeight: properties.dimension[3] + delta.height,
                }
              : {
                  translatedX: position.x,
                  translatedY: position.y,
                  translatedWidth: properties.dimension[2] + delta.width,
                  translatedHeight: properties.dimension[3] + delta.height,
                },
          })
        );
      }}
      onClick={(event) => dispatch(selectBox(properties.index))}
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
