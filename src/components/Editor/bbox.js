import React from "react";
import { Rnd } from "react-rnd";

import { useDispatch } from "react-redux";
import { updateLocation } from "../../contexts/recognition-slice";

function Bbox(properties) {
  const dispatch = useDispatch();

  return (
    <Rnd
      position={{
        x: properties.box[0],
        y: properties.box[1],
      }}
      onDragStop={(event, data) =>
        dispatch(updateLocation([properties.index, [data.x, data.y]]))
      }
      className="bbox"
    >
      THIS
    </Rnd>
  );
}

export default Bbox;
