import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postOCRText,
  postOCRTranslate,
} from "../../../../adapters/recognition";
import {
  createTranslateBox,
  deleteTranslateBox,
} from "../../../../contexts/recognition-slice";
import useOriginalList from "./use-original-list";

function useTranslate(requestID, cutIndex, bboxList) {
  const dispatch = useDispatch();
  const originalSelector = useOriginalList(requestID, cutIndex);
  const originalList = useSelector(originalSelector);

  const imgProperty = useSelector((state) => state.recognition.imgProperty);

  const getTranslate = useCallback(async () => {
    await postOCRText(requestID, cutIndex + 1, originalList);

    const translateIDs = [];
    for (const bbox of bboxList) {
      if (!translateIDs.includes(bbox.group_id))
        translateIDs.push(bbox.group_id);
    }

    dispatch(deleteTranslateBox({ requestID, cutIndex }));
    for (const id of translateIDs) {
      const translatedBox = await postOCRTranslate(requestID, cutIndex + 1, id);
      dispatch(
        createTranslateBox({
          requestID,
          cutIndex,
          translatedBox: {
            translate_id: translatedBox.id,

            x: translatedBox.x / imgProperty.currentWidthRatio,
            y: translatedBox.y / imgProperty.currentHeightRatio,
            width: translatedBox.width / imgProperty.currentWidthRatio,
            height: translatedBox.height / imgProperty.currentHeightRatio,

            text: translatedBox.text,
            // fontSize: translatedBox.fontSize / imgProperty.currentWidthRatio,
            fontSize: 20,
            fontColor: translatedBox.fontColor,
          },
        })
      );
    }
  }, [dispatch, requestID, cutIndex, bboxList, originalList, imgProperty]);

  return getTranslate;
}

export default useTranslate;
