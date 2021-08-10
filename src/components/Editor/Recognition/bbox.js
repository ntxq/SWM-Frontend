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
            id: properties.id,
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
      onResizeStop={(event, direction, reference, delta, position) =>
        dispatch(
          updateBbox({
            id: properties.id,
            index: properties.index,
            updatedBbox: properties.original
              ? {
                  originalWidth: Number(reference.style.width.slice(0, -2)),
                  originalHeight: Number(reference.style.height.slice(0, -2)),
                }
              : {
                  translatedWidth: Number(reference.style.width.slice(0, -2)),
                  translatedHeight: Number(reference.style.height.slice(0, -2)),
                },
          })
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
        {properties.original || properties.text}
      </Typography.Text>
    </Rnd>
  );
}

export default Bbox;