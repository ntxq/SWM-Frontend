import React, { useCallback, useState, useLayoutEffect } from "react";
import { Image } from "antd";

import { useDispatch } from "react-redux";
import { createBbox, setImageProperty } from "../../contexts/recognition-slice";

function RecognitionImage(properties) {
  const [bbox, setBbox] = useState([undefined, undefined]);
  const dispatch = useDispatch();

  const newBbox = useCallback(
    (x, y, step) => {
      if (step === 0) setBbox([x, y]);
      else {
        dispatch(
          createBbox([
            Math.min(bbox[0], x),
            Math.min(bbox[1], y),
            Math.abs(x - bbox[0]),
            Math.abs(y - bbox[1]),
          ])
        );
        setBbox([undefined, undefined]);
      }
    },
    [setBbox, dispatch, bbox]
  );

  useLayoutEffect(() => {
    const image = document.querySelector(".unselectable");
    function dispatchProperty() {
      dispatch(
        setImageProperty({
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
  }, [dispatch]);

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
      onLoad={({ target }) =>
        dispatch(
          setImageProperty({
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
