import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  postOCRText,
  postOCRTranslate,
} from "../../../../adapters/recognition";
import { createTranslateBox } from "../../../../contexts/recognition-slice";

function useTranslate(requestID, cutIndex, bboxList) {
  const dispatch = useDispatch();

  const getTranslate = useCallback(async () => {
    // await postOCRText(requestID, cutIndex + 1, bboxList);

    const translateIDs = [];
    for (const bbox of bboxList) {
      if (!translateIDs.includes(bbox.group_id))
        translateIDs.push(bbox.group_id);
    }

    const clientImage = document.querySelector(".unselectable");
    const widthRatio = clientImage.clientWidth / clientImage.naturalWidth;
    const heightRatio = clientImage.clientHeight / clientImage.naturalHeight;

    for (const id of translateIDs) {
      const translatedBox = await postOCRTranslate(requestID, cutIndex + 1, id);
      dispatch(
        createTranslateBox({
          requestID,
          cutIndex,
          translatedBox: {
            translate_id: translatedBox.id,

            x: translatedBox.x * widthRatio,
            y: translatedBox.y * heightRatio,
            width: translatedBox.width * widthRatio,
            height: translatedBox.height * heightRatio,

            text: translatedBox.text,
            // fontSize: translatedBox.fontSize,
            // fontColor: translatedBox.fontColor,
          },
        })
      );
    }
  }, [dispatch, requestID, cutIndex, bboxList]);

  return getTranslate;
}

export default useTranslate;
