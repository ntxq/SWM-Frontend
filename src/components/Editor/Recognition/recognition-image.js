import React, { useCallback, useState, useLayoutEffect } from "react";
import { Image } from "antd";

import { useDispatch } from "react-redux";
import {
  createBbox,
  setImageProperty,
} from "../../../contexts/recognition-slice";

function RecognitionImage(properties) {
  const [startPoint, setStartPoint] = useState([undefined, undefined]);
  const dispatch = useDispatch();

  const newBbox = useCallback(
    (x, y) => {
      dispatch(
        createBbox({
          requestID: properties.requestID,
          bbox: {
            originalX: Math.min(startPoint[0], x),
            originalY: Math.min(startPoint[1], y),
            originalWidth: Math.abs(x - startPoint[0]),
            originalHeight: Math.abs(y - startPoint[1]),

            translatedX: Math.min(startPoint[0], x),
            translatedY: Math.min(startPoint[1], y),
            translatedWidth: Math.abs(x - startPoint[0]),
            translatedHeight: Math.abs(y - startPoint[1]),
          },
        })
      );
      setStartPoint([undefined, undefined]);
    },
    [dispatch, startPoint, properties.requestID]
  );

  useLayoutEffect(() => {
    const image = document.querySelector(".unselectable");
    function dispatchProperty() {
      dispatch(
        setImageProperty({
          requestID: properties.requestID,
          cutIndex: properties.cutIndex,
          clientHeight: image.clientHeight,
          clientWidth: image.clientWidth,
          naturalHeight: image.naturalHeight,
          naturalWidth: image.naturalWidth,
        })
      );
    }

    window.addEventListener("resize", dispatchProperty);
    return () => {
      window.removeEventListener("resize", dispatchProperty);
    };
  }, [dispatch, properties.requestID, properties.cutIndex]);

  return (
    <Image
      src={properties.src}
      preview={false}
      onMouseDown={(event) =>
        setStartPoint([event.nativeEvent.offsetX, event.nativeEvent.offsetY])
      }
      onMouseUp={(event) =>
        newBbox(event.nativeEvent.offsetX, event.nativeEvent.offsetY)
      }
      onLoad={({ target }) =>
        dispatch(
          setImageProperty({
            requestID: properties.requestID,
            cutIndex: properties.cutIndex,

            clientHeight: target.clientHeight,
            clientWidth: target.clientWidth,
            naturalHeight: target.naturalHeight,
            naturalWidth: target.naturalWidth,
          })
        )
      }
      className="unselectable"
    />
  );
}

export default RecognitionImage;
