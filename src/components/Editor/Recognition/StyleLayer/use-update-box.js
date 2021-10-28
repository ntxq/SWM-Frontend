import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBbox,
  updateTranslateBox,
} from "../../../../contexts/recognition-slice";

function useUpdateBox() {
  const dispatch = useDispatch();
  const currentContext = useSelector(
    (state) => state.recognition.currentContext
  );

  const updateBox = useCallback(
    (action) => {
      if (currentContext === "bbox") dispatch(updateBbox(action));
      else if (currentContext === "translate")
        dispatch(updateTranslateBox(action));
    },
    [dispatch, currentContext]
  );

  return updateBox;
}

export default useUpdateBox;
