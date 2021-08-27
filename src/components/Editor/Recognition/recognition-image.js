import React, { useLayoutEffect, useRef } from "react";
import { Image } from "antd";

import { useDispatch } from "react-redux";
import { setImageProperty } from "../../../contexts/recognition-slice";
import useCreateBbox from "./use-create-bbox";

function RecognitionImage(properties) {
  const imageDiv = useRef();
  const bboxSketch = useRef();
  const dispatch = useDispatch();

  useCreateBbox(
    imageDiv,
    bboxSketch,
    properties.requestID,
    properties.cutIndex
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
    <div ref={imageDiv}>
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
