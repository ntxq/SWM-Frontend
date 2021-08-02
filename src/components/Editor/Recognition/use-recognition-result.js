import {
  selectOCR,
  getOCRResult,
  getOCRResultBbox,
} from "../../../adapters/backend";
import { useDispatch, useSelector } from "react-redux";
import { createBbox } from "../../../contexts/recognition-slice";

function useRecognitionResult(index, callback) {
  const bboxList = useSelector((state) => state.recognition.bboxList[index]);
  const dispatch = useDispatch();

  return async function () {
    if (Array.isArray(bboxList) && bboxList.length > 0) return callback();

    const ocrSuccess = await selectOCR(index);

    if (ocrSuccess) {
      const intervalID = setInterval(async () => {
        const processFinished = await getOCRResult(index);

        if (processFinished) {
          clearInterval(intervalID);
          const bboxList = await getOCRResultBbox(index);
          bboxList.map((bbox) =>
            dispatch(
              createBbox({
                id: index,
                bbox: {
                  bbox_id: bbox.bbox_id,

                  originalX: bbox.originalX,
                  originalY: bbox.originalY,
                  originalWidth: bbox.originalWidth,
                  originalHeight: bbox.originalHeight,

                  translatedX: bbox.originalX,
                  translatedY: bbox.originalY,
                  translatedWidth: bbox.originalWidth,
                  translatedHeight: bbox.originalHeight,

                  originalText: bbox.originalText,
                  // translatedText: bbox.translated,
                },
              })
            )
          );
          callback();
        }
      }, 2000);
    }
  };
}

export default useRecognitionResult;
