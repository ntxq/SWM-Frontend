import React, { useCallback, useState, useLayoutEffect, useRef } from "react";
import { Image } from "antd";

import { useDispatch } from "react-redux";
import {
  createBbox,
  setImageProperty,
} from "../../../contexts/recognition-slice";

function RecognitionImage(properties) {
  const [startPoint, setStartPoint] = useState([undefined, undefined]);
  const imageDiv = useRef();
  const bboxSketch = useRef();
  const dispatch = useDispatch();

  const newBbox = useCallback(
    (x, y) => {
      dispatch(
        createBbox({
          requestID: properties.requestID,
          cutIndex: properties.cutIndex,
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
    },
    [dispatch, startPoint, properties.requestID, properties.cutIndex]
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
    <div
      ref={imageDiv}
      onMouseDown={(event) => {
        setStartPoint([
          event.clientX - imageDiv.current.getBoundingClientRect().left,
          event.clientY - imageDiv.current.getBoundingClientRect().top,
        ]);

        bboxSketch.current.style.visibility = "visible";
      }}
      onMouseMove={(event) => {
        if (bboxSketch.current.style.visibility === "visible") {
          const offsetX =
            event.clientX - imageDiv.current.getBoundingClientRect().left;
          const offsetY =
            event.clientY - imageDiv.current.getBoundingClientRect().top;

          bboxSketch.current.style.transform = `translate(${Math.min(
            startPoint[0],
            offsetX
          )}px, ${Math.min(startPoint[1], offsetY)}px)`;

          bboxSketch.current.style.width = `${Math.abs(
            offsetX - startPoint[0]
          )}px`;
          bboxSketch.current.style.height = `${Math.abs(
            offsetY - startPoint[1]
          )}px`;
        }
      }}
      onMouseUp={(event) => {
        newBbox(
          event.clientX - imageDiv.current.getBoundingClientRect().left,
          event.clientY - imageDiv.current.getBoundingClientRect().top
        );
        setStartPoint([undefined, undefined]);

        bboxSketch.current.style.visibility = "hidden";
      }}
    >
      <Image
        src={properties.src}
        preview={false}
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
      <div ref={bboxSketch} className="bbox_sketch" />
    </div>
  );
}

export default RecognitionImage;
