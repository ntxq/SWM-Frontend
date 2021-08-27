import { useCallback, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createBbox } from "../../../contexts/recognition-slice";

function useCreateBbox(divReference, sketchReference, requestID, cutIndex) {
  const [startPoint, setStartPoint] = useState([undefined, undefined]);
  const dispatch = useDispatch();

  const onMouseDown = useCallback(
    (event) => {
      const { top, left, bottom, right } =
        divReference.current.getBoundingClientRect();

      const eventX = event.pageX;
      const eventY = event.pageY - window.pageYOffset;

      if (eventX > left && eventX < right && eventY > top && eventY < bottom) {
        setStartPoint([eventX - left, eventY - top]);
        sketchReference.current.style.visibility = "visible";

        sketchReference.current.style.transform = `translate(${
          eventX - left
        }px, ${eventY - top}px)`;

        sketchReference.current.style.width = "1px";
        sketchReference.current.style.height = "1px";
      }
    },
    [divReference, sketchReference]
  );

  const onMouseMove = useCallback(
    (event) => {
      if (sketchReference.current.style.visibility === "visible") {
        const offsetX = Math.max(
          Math.min(
            event.pageX - divReference.current.getBoundingClientRect().left,
            divReference.current.getBoundingClientRect().right -
              divReference.current.getBoundingClientRect().left
          ),
          0
        );
        const offsetY = Math.max(
          Math.min(
            event.pageY -
              divReference.current.getBoundingClientRect().top -
              window.pageYOffset,
            divReference.current.getBoundingClientRect().bottom -
              divReference.current.getBoundingClientRect().top
          ),
          0
        );

        sketchReference.current.style.transform = `translate(${Math.min(
          startPoint[0],
          offsetX
        )}px, ${Math.min(startPoint[1], offsetY)}px)`;

        sketchReference.current.style.width = `${Math.abs(
          offsetX - startPoint[0]
        )}px`;
        sketchReference.current.style.height = `${Math.abs(
          offsetY - startPoint[1]
        )}px`;
      }
    },
    [divReference, sketchReference, startPoint]
  );

  const onMouseUp = useCallback(
    (event) => {
      if (sketchReference.current.style.visibility === "visible") {
        console.log(
          event.pageX,
          divReference.current.getBoundingClientRect().left,
          divReference.current.getBoundingClientRect().right
        );

        const offsetX = Math.max(
          Math.min(
            event.pageX - divReference.current.getBoundingClientRect().left,
            divReference.current.getBoundingClientRect().right -
              divReference.current.getBoundingClientRect().left
          ),
          0
        );
        const offsetY = Math.max(
          Math.min(
            event.pageY -
              divReference.current.getBoundingClientRect().top -
              window.pageYOffset,
            divReference.current.getBoundingClientRect().bottom -
              divReference.current.getBoundingClientRect().top
          ),
          0
        );

        dispatch(
          createBbox({
            requestID: requestID,
            cutIndex: cutIndex,
            bbox: {
              originalX: Math.min(startPoint[0], offsetX),
              originalY: Math.min(startPoint[1], offsetY),
              originalWidth: Math.abs(offsetX - startPoint[0]),
              originalHeight: Math.abs(offsetY - startPoint[1]),

              translatedX: Math.min(startPoint[0], offsetX),
              translatedY: Math.min(startPoint[1], offsetY),
              translatedWidth: Math.abs(offsetX - startPoint[0]),
              translatedHeight: Math.abs(offsetY - startPoint[1]),
            },
          })
        );

        setStartPoint([undefined, undefined]);

        sketchReference.current.style.visibility = "hidden";
      }
    },
    [divReference, sketchReference, startPoint, requestID, cutIndex, dispatch]
  );

  useLayoutEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove]);

  useLayoutEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseUp]);

  useLayoutEffect(() => {
    window.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [onMouseDown]);
}

export default useCreateBbox;
