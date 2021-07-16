import React, { useCallback, useState } from "react";
import { Image } from "antd";

import { useDispatch } from "react-redux";
import { createBbox } from "../../contexts/recognition-slice";

function RecognitionImage(properties) {
  const dispatch = useDispatch();

  const [bbox, setBbox] = useState([
    undefined,
    undefined,
    undefined,
    undefined,
  ]);

  const newBbox = useCallback(
    (x, y, step) => {
      if (step === 0) setBbox((bbox) => [x, y, bbox[2], bbox[3]]);
      else {
        setBbox((bbox) => [bbox[0], bbox[1], x, y]);
        dispatch(createBbox(bbox));
      }
    },
    [setBbox, dispatch, bbox]
  );

  return (
    <Image
      src={properties.src}
      preview={false}
      onMouseDown={(event) =>
        newBbox(event.nativeEvent.offsetX, event.nativeEvent.offsetY, 0)
      }
      onMouseUp={(event) =>
        newBbox(event.nativeEvent.offsetX, event.nativeEvent.offsetY, 1)
      }
      className="unselectable"
    />
  );
}

export default RecognitionImage;
