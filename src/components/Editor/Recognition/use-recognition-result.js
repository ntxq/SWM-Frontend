import {
  selectOCR,
  getOCRResult,
  getOCRResultBbox,
} from "../../../adapters/backend";
import { useDispatch } from "react-redux";
import { createBbox } from "../../../contexts/recognition-slice";

function useRecognitionResult(index) {
  const dispatch = useDispatch();

  return async function () {
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

                  originalText: bbox.original,
                  // translatedText: bbox.translated,
                },
              })
            )
          );
        }
      }, 2000);
    }
  };
}

export default useRecognitionResult;
