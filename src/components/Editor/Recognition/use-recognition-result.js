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
                  id: bbox.id,

                  originalX: bbox.x,
                  originalY: bbox.y,
                  originalWidth: bbox.width,
                  originalHeight: bbox.height,

                  translatedX: bbox.x,
                  translatedY: bbox.y,
                  translatedWidth: bbox.width,
                  translatedHeight: bbox.height,

                  originalText: bbox.original,
                  translatedText: bbox.translated,
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
